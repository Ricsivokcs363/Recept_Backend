const db = require('../db/db')

async function addFav(user_id, recipe_id) {
    const checkSql = 'SELECT * FROM fav WHERE user_id = ? AND recipe_id = ?'
    const [existing] = await db.query(checkSql, [user_id, recipe_id])

    if (existing.length > 0) {
        return
    }

    const sql = 'INSERT INTO fav (user_id, recipe_id) VALUES (?, ?)'
    await db.query(sql, [user_id, recipe_id])
}

async function getFavs(user_id) {
    const sql = `
        SELECT recipes.*, users.username
        FROM fav
        JOIN recipes ON recipes.recipe_id = fav.recipe_id
        JOIN users ON users.user_id = recipes.user_id
        WHERE fav.user_id = ?
        ORDER BY recipes.recipe_id DESC
    `
    const [rows] = await db.query(sql, [user_id])
    return rows
}

async function deleteFav(user_id, recipe_id) {
    const sql = 'DELETE FROM fav WHERE user_id = ? AND recipe_id = ?'
    const [result] = await db.query(sql, [user_id, recipe_id])

    return { affectedRows: result.affectedRows }
}

module.exports = { addFav, getFavs, deleteFav }