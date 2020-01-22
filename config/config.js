// const dotenv = require('dotenv')
// dotenv.config()

const config = {
    
    // base_url: process.env.BASE_URL,
    // port: process.env.PORT,
    
    db: {
        db_URI: process.env.MONGO_DB_URI
    },
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY

}

console.log(config)

module.exports = config