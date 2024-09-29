const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT


app.get('/hello', ()=>{})



app.listen(port, ()=>{
    console.log(`Server started successfully at port ${port}`)
})