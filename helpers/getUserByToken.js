require('dotenv').config()
const jwt = require('jsonwebtoken')
const CoordinationOffice = require('../models/CoordinationOffice')

const TOKEN = process.env.TOKEN

const getUserByToken = async (token) => {

    if(!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }
    const decoded = jwt.verify(token, TOKEN)
    const userId = decoded.id
    const user = await CoordinationOffice.findOne({where: {_id: userId}})

    return user
}

module.exports = getUserByToken