const express = require('express')
const { addToFav, listFavs, removeFav} = require('../controllers/favController')
const { auth } = require('../middleware/userMiddleware')

const router = express.Router()

router.post('/:recipeId', auth, addToFav)
router.get('/', auth, listFavs)
router.delete('/delete/:recipe_id', auth, removeFav)

module.exports = router