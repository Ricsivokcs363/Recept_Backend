const db = require('../db/db')

async function findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?'
    const [result] = await db.query(sql, [email])
    //console.log(email)

    return result[0] || null
}

async function createUser(username, email,hash) {
    const sql = 'INSERT INTO users (user_id, username, email, password) VALUES (NULL, ?, ?, ?)'
    const [result] = await db.query(sql, [username, email, hash])

    return  {userId: result.insertId}
}

module.exports = {findByEmail , createUser} 