const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')

const userRoutes = require('./routes/userRoutes')
const recipeRoutes = require('./routes/recipeRoutes')
const favRoutes = require('./routes/favRoutes')


const backend = express()

backend.use(express.json())
backend.use(cookieParser())

backend.use('/users', userRoutes)
backend.use('/recipe', recipeRoutes )
backend.use('/fav', favRoutes)
backend.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))


module.exports = backend