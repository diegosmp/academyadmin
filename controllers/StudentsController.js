const validateEmail = require('../helpers/validateEmail')
const Students = require('../models/Students')
module.exports = class StudentsController {
  static async createStudents(req, res) {
    const { name, email, cpf } = req.body
    if (!name) {
      return res.status(422).json({ message: 'O campo nome é obrigatório!' })
    }

    if (email) {
      try {
        validateEmail(email)
      } catch (error) {
        return res.status(422).json({ message: error.message })
      }
    }

    if (!cpf) {
      return res.status(422).json({ message: 'O campo CPF é obrigatório!' })
    }

    const cpfWithoutSpecialChars = cpf.replace(/[.-]/g, '')

    if (cpfWithoutSpecialChars.length !== 11) {
      return res.status(422).json({ message: 'CPF inválido!' })
    }

    const existingStudent = await Students.findOne({
      where: { cpf: cpfWithoutSpecialChars },
    })

    if (existingStudent) {
      return res.status(422).json({ message: 'CPF já cadastrado!' })
    }

    try {
      const notEmail = 'E-mail não cadastrado'
      const newStudent = await Students.create({
        name,
        email: email || notEmail,
        cpf: cpfWithoutSpecialChars,
      })
      res
        .status(201)
        .json({ message: 'Usuário cadastrado com sucesso!', newStudent })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao conectar com servidor!' })
    }
  }

  static async editStudents(req, res) {
    const idStudent = req.params.id
    const { name, email } = req.body
    if (!name) {
      return res.status(422).json({ message: 'O campo nome é obrigatório!' })
    }

    if (!email) {
      return res.status(422).json({ message: 'O campo e-mail é obrigatório!' })
    }

    try {
      validateEmail(email)
    } catch (error) {
      return res.status(422).json({ message: error.message })
    }

    const existsStudent = await Students.findByPk(idStudent)

    if (!existsStudent) {
      return res.status(404).json({ message: 'Aluno não cadastrado!' })
    }

    try {
      await Students.update({
        name,
        email,
      })
      res.status(200).json({ message: 'Aluno atualizado com sucesso!' })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao conectar com servidor!' })
    }
  }
}
