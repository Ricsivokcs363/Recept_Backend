const express = require('express')
const { addToFav, listFavs } = require('../controllers/favController')
const { auth } = require('../middleware/userMiddleware')

const router = express.Router()

router.post('/:recipeId', auth, addToFav)
router.get('/', auth, listFavs)

module.exports = router