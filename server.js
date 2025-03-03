const express = require('express')
const app = express()
const database = require('./Configuration/Database')
require('dotenv').config()

port = process.env.PORT || 5000



database.connect()

app.listen(port,(req,res) =>{
    console.log(`Server is running at ${port}` )
})