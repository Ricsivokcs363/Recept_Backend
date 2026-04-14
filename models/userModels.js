const db = require('../db/db')

async function findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?'
    const [result] = await db.query(sql, [email])

    return result[0] || null
}

async function createUser(username, email, hash) {
    const sql = `
        INSERT INTO users (user_id, username, email, password, role)
        VALUES (NULL, ?, ?, ?, 'user')
    `
    const [result] = await db.query(sql, [username, email, hash])

    return { userId: result.insertId }
}

async function getAllUsers() {
    const sql = `
        SELECT user_id, username, email, role
        FROM users
        ORDER BY user_id ASC
    `
    const [rows] = await db.query(sql)
    return rows
}

async function deleteUser(user_id) {
    const sql = 'DELETE FROM users WHERE user_id = ?'
    const [result] = await db.query(sql, [user_id])

    return result.affectedRows
}

async function editOwnUser(user_id, username, email, password) {
    const sql = 'UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?'
    const [result] = await db.query(sql, [username, email, password, user_id])

    return { affectedRows: result.affectedRows }
}

async function editUserByAdmin(user_id, username, email, role) {
    const sql = 'UPDATE users SET username = ?, email = ?, role = ? WHERE user_id = ?'
    const [result] = await db.query(sql, [username, email, role, user_id])

    return { affectedRows: result.affectedRows }
}

module.exports = {
    findByEmail,
    createUser,
    getAllUsers,
    deleteUser,
    editOwnUser,
    editUserByAdmin
}