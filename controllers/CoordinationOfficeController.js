require('dotenv').config()
const CoordinationOffice = require("../models/CoordinationOffice")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const createUserToken = require("../helpers/createUserToken")
const uploudCloudStorage = require('../helpers/uploudCloudStorage')
const getToken = require('../helpers/getToken')
const getUserByToken = require('../helpers/getUserByToken')

const TOKEN = process.env.TOKEN

module.exports = class CoordinationOfficeController {
    static async signup (req, res) {
        const file = req.file
        let imageUrl = ''

        const {username, email, password, confirmPassword} = req.body

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

        if(file) {
            imageUrl = `${await uploudCloudStorage(file)}`
        }

        try {

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

    static async checkUserToken (req, res) {
        let currentUser

        if(req.headers.authorization){
            const token = await getToken(req)
            const decoded = jwt.verify(token, TOKEN)
            currentUser = await CoordinationOffice.findByPk(decoded.id)
            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).json(currentUser)
    }

    static async getCoordById(req, res) {
        const id = req.params.id

        const user = await CoordinationOffice.findByPk(id, {attributes:{exclude: ['password']}})
        if(!user) {
            return res.status(422).json({ message: 'Usuário não encontrado!' })
        }

        res.status(200).json({ user })
    }

    static async editCoord(req, res) {
        console.log(req.body)
        const id = req.params.id
        const file = req.file
        let imageUrl = ''
        const token = await getToken(req)
        const user = await getUserByToken(token)

        const {username, email, password, confirmPassword} = req.body

        if(!username) {
            return res.status(422).json({ message: 'O campo nome é obrigatório.' })
        }
        user.username = username
        
        if(email) {
            const emailExists = await CoordinationOffice.findOne({where: {email}})
            if(user.email !== email && emailExists){
                return res.status(422).json({ message: 'Por favor utilize outro email!' })
            }
        }
        user.email = email
        
        if(password) {
            if(password !== confirmPassword) {
                return res.status(422).json({ message: 'A senha não confere!' })
            } else if(password === confirmPassword && password !== null){
                const salt = await bcrypt.genSalt(12)
                const passwordHash = await bcrypt.hash(password, salt)
    
                user.password = passwordHash
            }
        }

        if(file) {
            imageUrl = `${await uploudCloudStorage(file)}`
        }

        try {
            const updatedUser = await CoordinationOffice.findByPk(id)
            if(updatedUser) {

                await updatedUser.update({
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    image: imageUrl
                })
    
                return res.status(200).json({ message: 'Usuário atualizado com sucesso!' })

            } else {
                return res.status(404).json({ message: 'Usuário não encontrado.' })
            }

        } catch (error) {
            res.status(500).json({ message: 'Erro ao processar a solicitação.', error })
        }
    }
}