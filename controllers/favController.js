const { addFav, getFavs } = require('../models/favModel')

async function addToFav(req, res) {
    try {
        await addFav(req.user.user_id, req.params.recipeId)
        res.status(201).json({ message: 'Kedvencekhez adva' })
    } catch {
        res.status(500).json({ error: 'Fav hiba' })
    }
}

async function listFavs(req, res) {
    try {
        const favs = await getFavs(req.user.user_id)
        res.status(200).json(favs)
    } catch {
        res.status(500).json({ error: 'Fav lista hiba' })
    }
}

module.exports = { addToFav, listFavs }