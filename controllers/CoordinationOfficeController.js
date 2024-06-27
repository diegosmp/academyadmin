require('dotenv').config()
const CoordinationOffice = require("../models/CoordinationOffice")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const createUserToken = require("../helpers/createUserToken")
const uploudCloudStorage = require('../helpers/uploudCloudStorage')

module.exports = class CoordinationOfficeController {
    static async signup (req, res) {
        const file = req.file
        const {username, email, password, confirmPassword, image} = req.body

        if(!username) {
            return res.status(422).json({ message: 'O campo nome é obrigatório.' })
        }

        if(!email) {
            return res.status(422).json({ message: 'O campo email é obrigatório.' })
        }

        if(!password) {
            return res.status(422).json({ message: 'O campo senha é obrigatório.' })
        }

        if(!confirmPassword) {
            return res.status(422).json({ message: 'O campo confirmação da senha é obrigatório.' })
        }

        if(confirmPassword !== password) {
            return res.status(422).json({ message: 'A senhas não são iguais.' })
        }

        const emailExists = await CoordinationOffice.findOne({where: {email}})

        if(emailExists) {
            return res.status(422).json({ message: 'O email já está cadastrado.' })
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        if(!file) {
            return res.status(422).json({ message: 'Nenhuma imagem foi enviada' })
        }

        try {
            const imageUrl = `${await uploudCloudStorage(file)}`

            const newCoord = await CoordinationOffice.create({
                username,
                email,
                password: passwordHash,
                image: imageUrl
            })

            await createUserToken(newCoord, req, res)

        } catch (error) {
                res.status(500).json({ message: 'Erro ao processar a solicitação.', error })
        }
    }

    static async signin(req, res) {
        const {email, password} = req.body

        if(!email) {
            return res.status(422).json({ message: 'Email e senha são obrigatorios!' })
        }

        if(!password) {
            return res.status(422).json({ message: 'Email e senha são obrigatorios!' })
        }

        const user = await CoordinationOffice.findOne({where: {email}})
        if(!user) {
            return res.status(422).json({ message: 'Email ou senha inválido!' })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) {
            return res.status(422).json({ message: 'Email ou senha inválido!' })
        }

        await createUserToken(user, req, res)
    }
}