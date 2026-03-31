const { getAllRecipes, createRecipe, deleteRecipe, findRecipe,getAllRecipesLogIn} = require('../models/recipeModel')

async function searchRecipe(req, res) {
    try {
        const { search } = req.query 

        if (!search) {
            return res.status(400).json({ error: 'Hiányzó keresési kifejezés' })
        }

        const result = await findRecipe(search)
        res.status(200).json(result)
    } catch (err) {
        //console.error('KERESÉSI HIBA:', err)
        res.status(500).json({ error: 'Recept lekérdezési hiba' })
    }
}
async function listRecipes(req, res) {
    try {
        const recipes = await getAllRecipes()
        res.status(200).json(recipes)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Recept lekérdezési hiba' })
    }
}

async function listRecipesLogged(req, res) {
    try {
        const { user_id } = req.user
        const recipes = await getAllRecipesLogIn(user_id)
        res.json(recipes)
    } catch (err) {
        res.status(500).json({ error: 'Lekérdezési hiba' })
    }
}

async function addRecipe(req, res) {
    try {
        const { title, description, ingredients } = req.body

        if (!title || !ingredients) {
            return res.status(400).json({ error: 'Hiányzó adatok' })
        }

        const image_url = req.file
            ? `/uploads/recipes/${req.user.user_id}/${req.file.filename}`
            : null

        await createRecipe(
            title,
            description,
            ingredients,
            image_url,
            req.user.user_id
        )

        res.status(201).json({ message: 'Recept létrehozva' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Recept feltöltési hiba' })
    }
}

async function removeRecipe(req, res) {
    try {
        const affected = await deleteRecipe(
            req.params.id,
            req.user.user_id
        )

        if (affected === 0) {
            return res.status(403).json({ error: 'Nincs jogosultság' })
        }

        res.status(200).json({ message: 'Recept törölve' })
    } catch (err) {
        res.status(500).json({ error: 'Recept törlési hiba' })
    }
}

const { getMyRecipes } = require('../models/recipeModel')

async function myRecipes(req, res) {
    try {
        const { user_id } = req.user   // 🔥 JWT-ből jön

        const recipes = await getMyRecipes(user_id)

        res.status(200).json(recipes)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Saját receptek lekérdezési hiba' })
    }
}

module.exports = { listRecipes, addRecipe, removeRecipe, searchRecipe, myRecipes,listRecipesLogged }