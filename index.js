require('dotenv').config()
const cors = require('cors')
const express = require('express')
const conn = require('./config/conn')
const CoordinationOfficeRoute = require('./routes/CoordinationOfficeRoute')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use('/coord', CoordinationOfficeRoute)

conn.sync().then(() => app.listen(PORT)).catch(err => console.error(err))