const express = require('express')
const mongoose = require ('mongoose')
const bodyParser = require('body-parser')
const app = express()

const authRoutes = require('./routes/auth')

app.use(bodyParser.json())
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

app.use('/auth', authRoutes)

mongoose.connect(`mongodb+srv://rdeeluxe:${process.env.MONGOOSE_ROOT_SECRET}@monthy-replay-db.e9vrlv4.mongodb.net/monthy-replay`)
app.listen(1000)