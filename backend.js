const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes')
const recipeRoutes = require('./routes/recipeRoutes')
const favRoutes = require('./routes/favRoutes')

const backend = express()

backend.use(express.json())
backend.use(cookieParser())

backend.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://192.168.10.110:5173'
    ],
    credentials: true
}))

backend.use('/users', userRoutes)
backend.use('/recipe', recipeRoutes)
backend.use('/fav', favRoutes)
backend.use('/uploads', express.static(path.join(__dirname, 'uploads')))

module.exports = backend