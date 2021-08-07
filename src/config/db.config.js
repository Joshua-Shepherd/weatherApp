const dote = require('dotenv')
dote.config({path: './src/config/config.env'})

module.exports = {
    url: process.env.ATLAS_URL
}