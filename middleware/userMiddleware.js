const jwt = require('jsonwebtoken')
const { config } = require('../config/dotenvConfig')

function auth(req, res, next) {
    const token = req.cookies?.[config.COOKIE_NAME]
    console.log(`token: ${token}`);
    if (!token) {
        return res.status(401).json({ error: 'Nincs cookie' })
    }

    try {
        req.user = jwt.verify(token, config.JWT_SECRET)
        console.log(`req.user: ${req.user}`);
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Érvénytelen vagy lejárt token' })
    }
}

module.exports = { auth }