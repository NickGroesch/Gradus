// db.js
require('dotenv').config()

module.exports = {
    // to master
    DB: process.env.MONGO
    // on local
    // DB: 'mongodb://localhost:27017/auth'
}
console.log(process.env.MONGO)