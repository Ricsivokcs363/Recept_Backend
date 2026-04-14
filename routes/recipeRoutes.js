const express = require('express')
const {listRecipes, addRecipe,removeRecipe,searchRecipe, myRecipes,listRecipesLogged} = require('../controllers/recipeController')

const { auth } = require('../middleware/userMiddleware')
const { upload } = require('../middleware/recipeUpload')

const router = express.Router()

router.get('/list', listRecipes)
router.get('/listLoggedIn', auth, listRecipesLogged)
router.get('/search', searchRecipe)
router.get('/my', auth, myRecipes)

router.post('/add', auth, upload.single('image'), addRecipe)
router.delete('/:id', auth, removeRecipe)

module.exports = router