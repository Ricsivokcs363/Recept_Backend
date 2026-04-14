const express = require('express')
const {register,login,whoAmI,logout, listUsers,deleteUsers,updateOwnProfile,updateUserAdmin} = require('../controllers/userContoller')

const { auth } = require('../middleware/userMiddleware')
const { isAdmin } = require('../middleware/isAdminMiddleware')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/whoami', auth, whoAmI)
router.post('/logout', auth, logout)

// saját profil
router.put('/edit', auth, updateOwnProfile)

// admin
router.get('/allusers', auth, isAdmin, listUsers)
router.put('/edit/:user_id', auth, isAdmin, updateUserAdmin)
router.delete('/delete/:user_id', auth, isAdmin, deleteUsers)

module.exports = router