const db = require('../db/db')

async function addFav(user_id, recipe_id) {
    const sql = 'INSERT INTO fav (user_id, recipe_id) VALUES (?, ?)'
    await db.query(sql, [user_id, recipe_id])
}

async function getFavs(user_id) {
    const sql = `
        SELECT recipes.* FROM fav
        JOIN recipes ON recipes.recipe_id = fav.recipe_id
        WHERE fav.user_id = ?
    `
    const [rows] = await db.query(sql, [user_id])
    return rows
}

module.exports = { addFav, getFavs }