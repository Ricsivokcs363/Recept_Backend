const express = require('express')
const { listRecipes,addRecipe,removeRecipe} = require('../controllers/recipeController')
const { auth } = require('../middleware/userMiddleware')
const { upload } = require('../middleware/recipeUpload')

const router = express.Router()

router.get('/list', listRecipes)
router.post('/add', auth, upload.single('image'), addRecipe )
router.delete('/:id', auth, removeRecipe)

module.exports = router