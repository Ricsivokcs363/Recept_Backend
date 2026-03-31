const express = require('express')
const { listRecipes,addRecipe,removeRecipe, searchRecipe,myRecipes,listRecipesLogged} = require('../controllers/recipeController')
const { auth } = require('../middleware/userMiddleware')
const { upload } = require('../middleware/recipeUpload')

const router = express.Router()

router.get('/list', listRecipes)
router.get('/listLoggedIn', auth, listRecipesLogged)
router.post('/add', auth, upload.single('image'), addRecipe )
router.delete('/:id', auth, removeRecipe)
router.get('/search', searchRecipe)
router.get('/my', auth, myRecipes)

module.exports = router