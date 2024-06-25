const express = require('express')
const conn = require('./conn')

const app = express()

const serverConnection = conn.sync().then(() => app.listen(5000)).catch(err => console.error(err))

module.exports = serverConnection