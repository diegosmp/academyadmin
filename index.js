require('dotenv').config()
const express = require('express')
const conn = require('./config/conn')
const CoordinationOfficeRoute = require('./routes/CoordinationOfficeRoute')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.use('/coord', CoordinationOfficeRoute)

conn.sync().then(() => app.listen(PORT)).catch(err => console.error(err))