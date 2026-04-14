const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {    findByEmail,createUser, getAllUsers,deleteUser,editOwnUser,editUserByAdmin} = require("../models/userModels")

const { config } = require('../config/dotenvConfig')

const cookieOpts = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
}

async function register(req, res) {
    try {
        const { username, password, email } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Minden mezőt ki kell tölteni!' })
        }

        const exist = await findByEmail(email)

        if (exist) {
            return res.status(409).json({ error: 'Ez az email már létezik!' })
        }

        const hash = await bcrypt.hash(password, 10)
        await createUser(username, email, hash)

        return res.status(201).json({ message: 'Sikeres regisztráció!' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Szerver oldali hiba' })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email és jelszó kötelező' })
        }

        const userSQL = await findByEmail(email)

        if (!userSQL) {
            return res.status(401).json({ error: 'Hibás email' })
        }

        const ok = await bcrypt.compare(password, userSQL.password)

        if (!ok) {
            return res.status(401).json({ error: 'Hibás jelszó' })
        }

        const token = jwt.sign(
            {
                user_id: userSQL.user_id,
                email: userSQL.email,
                username: userSQL.username,
                role: userSQL.role
            },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
        )

        res.cookie(config.COOKIE_NAME, token, cookieOpts)

        return res.status(200).json({
            message: 'Sikeres bejelentkezés',
            user: {
                user_id: userSQL.user_id,
                username: userSQL.username,
                email: userSQL.email,
                role: userSQL.role
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Bejelentkezési hiba' })
    }
}

async function whoAmI(req, res) {
    try {
        const { user_id, username, email, role } = req.user

        return res.status(200).json({
            user_id,
            username,
            email,
            role
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'whoAmI server oldali hiba' })
    }
}

async function logout(req, res) {
    return res
        .clearCookie(config.COOKIE_NAME, { path: '/' })
        .status(200)
        .json({ message: 'Sikeres kilépés' })
}

async function listUsers(req, res) {
    try {
        const users = await getAllUsers()
        return res.status(200).json(users)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Felhasználók lekérési hiba' })
    }
}

async function deleteUsers(req, res) {
    try {
        const { user_id } = req.params

        const torles = await deleteUser(user_id)

        if (torles === 0) {
            return res.status(404).json({ error: "Felhasználó nem található" })
        }

        return res.status(200).json({ message: "Felhasználó törölve" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Törlési hiba" })
    }
}

async function updateOwnProfile(req, res) {
    try {
        const { username, email, password } = req.body
        const { user_id } = req.user

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Minden mező kötelező' })
        }

        const hash = await bcrypt.hash(password, 10)
        const result = await editOwnUser(user_id, username, email, hash)

        return res.status(200).json({
            message: 'Felhasználó frissítve',
            affectedRows: result.affectedRows
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Felhasználó módosítás hiba' })
    }
}

async function updateUserAdmin(req, res) {
    try {
        const { user_id } = req.params
        const { username, email, role } = req.body

        if (!username || !email || !role) {
            return res.status(400).json({ error: 'A username, email és role kötelező' })
        }

        const result = await editUserByAdmin(user_id, username, email, role)

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Felhasználó nem található' })
        }

        return res.status(200).json({
            message: 'Felhasználó frissítve',
            affectedRows: result.affectedRows
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Admin felhasználó módosítás hiba' })
    }
}

module.exports = {
    register,
    login,
    whoAmI,
    logout,
    listUsers,
    deleteUsers,
    updateOwnProfile,
    updateUserAdmin
}