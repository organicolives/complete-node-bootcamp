const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = require('./app')

dotenv.config({
    path: './config.env'
})

const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log(con.connections)
    console.log('DB Connection Successful')
})