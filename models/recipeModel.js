const db = require('../db/db')


async function findRecipe(search) {
    const sql = `
        SELECT recipes.*, users.username
        FROM recipes
        JOIN users ON users.user_id = recipes.user_id
        WHERE recipes.title LIKE ?
    `
    const [rows] = await db.query(sql, [`%${search}%`])
    return rows
}
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

async function getMyRecipes(user_id) {
    const sql = `
        SELECT * FROM recipes WHERE user_id = 1 ORDER BY RAND();
    `

    const [rows] = await db.query(sql, [user_id])

    return rows
}


module.exports = { getAllRecipes, createRecipe, deleteRecipe,findRecipe,getMyRecipes }