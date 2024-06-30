require('dotenv').config()
const cors = require('cors')
const express = require('express')
const conn = require('./config/conn')
const UsersRoutes = require('./routes/UsersRoute')
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/users', UsersRoutes)
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'https://localhost:5000/users  -  Rota principal' })
})

conn
  .sync()
  .then(() => app.listen(PORT))
  .catch((err) => console.error(err))
