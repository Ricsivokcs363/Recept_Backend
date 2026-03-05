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

async function deleteUser(user_id) {
    const sql = 'DELETE FROM users WHERE user_id = ?'
    const [result] = await db.query(sql, [user_id])

    return result.affectedRows
}

async function editUser(user_id,username, email,password) {
    const sql = 'UPDATE users SET username=?,email=?, password=? WHERE user_id=?'
    const [result] = await db.query(sql,[username,email,password, user_id])

    return { affectedRows: result.affectedRows }
}

module.exports = {findByEmail , createUser, deleteUser,editUser} 