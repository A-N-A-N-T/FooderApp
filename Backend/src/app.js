// This file is usefull to create server  
const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/authRoutes")
const foodRoute = require("./routes/foodRoutes")
const foodPartnerRoute = require("./routes/foodPartnerRoutes")
const cors = require("cors")
const dbconnect = require("./databases/dbconnection")
const app = express()

dotenv.config()



dbconnect();

app.use(cookieParser())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })); // middle for getting data from form of frontend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// routes defining

app.use("/auth",authRoute)
app.use("/food",foodRoute)
app.use("/foodPartner",foodPartnerRoute)


app.get("/",(req,res) =>{
    res.send("Hey this for testing !")
})


module.exports = app