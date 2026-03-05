const express = require('express')
const {register, login, whoAmI, logout, deleteUsers, updateUser} = require('../controllers/userContoller')
const {auth} = require('../middleware/userMiddleware')


const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/whoami', auth, whoAmI)
router.post('/logout', auth, logout)
router.delete('/delete/:user_id', auth, deleteUsers)
router.put('/edit', auth, updateUser)

module.exports = router