const CoordinationOffice = require("../models/CoordinationOffice")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = class CoordinationOfficeController {
    static async signup (req, res) {
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

        const newCoord = await CoordinationOffice.create({
            username,
            email,
            password: passwordHash,
            image
        })

        try {
            res.status(201).json({ message: 'Usuário cadastrado com sucesso.', newCoord })
        } catch (error) {
            res.status(500).json({ message: 'Erro ao conectar ao servidor.', error })
            return
        }
    }
}