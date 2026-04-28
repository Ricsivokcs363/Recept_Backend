const {config} = require('./config/dotenvConfig')
const backend = require('./backend')

const PORT = config.PORT
const HOST = config.HOST

backend.listen(PORT, () => {
    console.log(`Szerver IP: https://${HOST}`)
})