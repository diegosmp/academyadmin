const express = require('express')
const serverConnection = require('./config/server')
const app = express()
app.use(express.json())

serverConnection