const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = require('./app')

dotenv.config({
    path: './config.env'
})

app.listen(5000, console.log('server is running'))