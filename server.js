const {config} = require('./config/dotenvConfig')
const backend = require('./backend')

const PORT = config.PORT
const HOST = config.HOST

backend.listen(PORT,HOST, () => {
    console.log(`Szerver IP: http://${HOST}:${PORT}`)
})