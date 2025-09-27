// file to connect database

const mongoose  = require("mongoose")
const dotenv = require("dotenv")

function dbconnect() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Database connected!")
    })
    .catch((err)=>{
        console.log(`Database connection error ${err}`)
    })
    
}

module.exports = dbconnect