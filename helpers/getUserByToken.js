require('dotenv').config()
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')

const TOKEN = process.env.TOKEN

const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado!' })
  }
  const decoded = jwt.verify(token, TOKEN)
  const userId = decoded.id
  const user = await Users.findOne({ where: { _id: userId } })

  return user
}

module.exports = getUserByToken
