require('dotenv').config()
const jwt = require('jsonwebtoken')
const TOKEN = process.env.TOKEN

const createUserToken = async (user, req, res) => {
    const token = jwt.sign({
        username: user.username,
        id: user._id
    }, TOKEN)

    res.status(200).json({ message: 'Autenticado com sucesso.', token, user: user._id })
}

module.exports = createUserToken