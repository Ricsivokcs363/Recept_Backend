const { addFav, getFavs, deleteFav } = require('../models/favModel')

async function addToFav(req, res) {
    try {
        await addFav(req.user.user_id, req.params.recipeId)
        return res.status(201).json({ message: 'Kedvencekhez adva' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Fav hiba' })
    }
}

async function listFavs(req, res) {
    try {
        const favs = await getFavs(req.user.user_id)
        return res.status(200).json(favs)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Fav lista hiba' })
    }
}

async function removeFav(req, res) {
    try {
        const { recipe_id } = req.params
        const { user_id } = req.user

        const result = await deleteFav(user_id, recipe_id)

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Nincs ilyen kedvenc" })
        }

        return res.status(200).json({ message: "Kedvenc törölve" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Fav törlési hiba" })
    }
}

module.exports = { addToFav, listFavs, removeFav }