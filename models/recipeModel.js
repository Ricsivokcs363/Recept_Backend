const db = require('../db/db')

async function getAllRecipes() {
    const sql = `
        SELECT recipes.*, users.username 
        FROM recipes 
        JOIN users ON users.user_id = recipes.user_id
        ORDER BY created_at DESC
    `
    const [rows] = await db.query(sql)
    return rows
}

async function createRecipe(title, description, ingredients, image_url, user_id) {
    const sql = `
        INSERT INTO recipes (title, description, ingredients, image_url, user_id)
        VALUES (?, ?, ?, ?, ?)
    `
    const [result] = await db.query(sql, [
        title, description, ingredients, image_url, user_id
    ])
    return result.insertId
}

async function deleteRecipe(recipe_id, user_id) {
    const sql = `
        DELETE FROM recipes 
        WHERE recipe_id = ? AND user_id = ?
    `
    const [result] = await db.query(sql, [recipe_id, user_id])
    return result.affectedRows
}

module.exports = { getAllRecipes, createRecipe, deleteRecipe }