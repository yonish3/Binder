const mongoose = require('mongoose');
const config = require('../../config/config')

console.log('config', config)
const DB_URI = config.db.db_URI

const connectionOptions = {
    // poolSize: 20,
    socketTimeoutMS: 0,
    connectTimeoutMS: 0,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
console.log('db_uri', DB_URI)
mongoose.connect(DB_URI, connectionOptions, (err) => {
    if (err) {
        console.log(err.message)
    }
})

module.exports = {mongoose};