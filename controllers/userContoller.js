const bcrypt = require('bcrypt')
const { findByEmail, createUser , deleteUser,editUser} = require("../models/userModels")
const { config } = require('../config/dotenvConfig')
const jwt = require('jsonwebtoken')

const cookieOpts = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAAge: 1000 * 60 * 60 * 24 * 7
}

async function register(req, res) {
    try {
        const { username, password, email } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Minden mezőt ki kell tölteni!' })
        }
        

        const exist = await findByEmail(email)
        console.log(exist)
        if (exist) {
            return res.status(409).json({ error: 'Ez az email már létezik!' })
        }

        const hash = await bcrypt.hash(password, 10)
        const { insertId } = await createUser(username, email, hash)

        return res.status(201).json({ message: 'Sikeres regisztráció!' })
    } catch (err) {
        return res.status(500).json({ error: 'Szerver oldali hiba', err })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email és jelszó kötelező' })
        }

        const userSQL = await findByEmail(email)
        // console.log(email)
        if (!userSQL) {
            return res.status(401).json({ error: 'hibás email' })
        }

        const ok = await bcrypt.compare(password, userSQL.password)
        //console.log(ok)

        if (!ok) {
            return res.status(401).json({ error: 'hibás jelszó' })
        }

        const token = jwt.sign(
            {
                user_id: userSQL.user_id,
                email: userSQL.email,
                username: userSQL.username
            },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
        )
        //console.log(token)

        res.cookie(config.COOKIE_NAME, token, cookieOpts)
        return res.status(200).json({ message: 'sikeres bejelentkezés' })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Bejelentezési hiba', err })
    }

}

async function whoAmI(req,res) {
    const {user_id, username,email} = req.user
    try {
        return res.status(200).json({ user_id: user_id, username: username, email:email})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'whoAmi server oldali hiba'})
    }
}

async function logout(req, res) {
    return res.clearCookie(config.COOKIE_NAME, {path: '/'}).status(200).json({message: 'Sikeres kilépés'})
}


async function deleteUsers(req, res) {
    try {
        const { user_id } = req.params

        const torles = await deleteUser(user_id)

        if (torles === 0) {
            return res.status(404).json({ message: "Felhasználó nem található" })
        }

        res.status(200).json({ message: "Felhasználó törölve" })

    } catch (err) {
        res.status(500).json({ error: "Törlési hiba" })
    }
}

async function updateUser(req, res) {
    try {
        const { username, email, password } = req.body
        const { user_id } = req.user   // JWT-ből

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Minden mező kötelező' })
        }

        const hash = await bcrypt.hash(password, 10)

        const result = await editUser(user_id, username, email, hash)

        return res.status(200).json({
            message: 'Felhasználó frissítve',
            affectedRows: result.affectedRows
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Felhasználó módosítás hiba' })
    }
}


module.exports = { register, login, whoAmI, logout, deleteUsers,updateUser}