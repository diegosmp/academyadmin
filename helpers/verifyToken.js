require('dotenv').config()
const jwt = require('jsonwebtoken')
const getToken = require('./getToken')
const TOKEN = process.env.TOKEN

const verifyToken = async (req, res, next) => {

    if(!req.headers['authorization']){
        return res.status(401).json({ message: 'Acesso negado!' })
    }

    const token = await getToken(req)
    if(!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }

    try {
        const verified = jwt.verify(token, TOKEN)
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({ message: 'Token inválido!' })
    }
}

module.exports = verifyToken