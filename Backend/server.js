// This file is used to start the server
const app = require("./src/app");
const dbconnect = require("./src/databases/dbconnection");



dbconnect();  // fn calling to connect with the databases..






app.listen(3030,()=>{
    console.log(`Server Started at ${3030}`)
})