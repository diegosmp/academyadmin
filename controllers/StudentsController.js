const Students = require('../models/Students')
module.exports = class StudentsController {
  static async createStudents(req, res) {
    let cpfWithoutPoint = ''
    const { name, email, cpf } = req.body
    if (!name) {
      return res.status(422).json({ message: 'O campo nome é obrigado!' })
    }

    if (email) {
      const emailExists = await Students.findOne({ where: { email } })
      if (emailExists) {
        return res.status(422).json({ message: 'Email já cadastrado!' })
      }
    }

    if (!cpf) {
      return res.status(422).json({ message: 'O campo CPF é obrigado!' })
    }

    const existsCPF = await Students.findOne({ where: { cpf } })
    if (existsCPF) {
      return res.status(422).json({ message: 'CPF já cadastrado!' })
    }

    cpfWithoutPoint = cpf.replace(/[.-]/g, '')

    try {
      const newStudent = await Students.create({
        name,
        email,
        cpf: cpfWithoutPoint,
      })
      res
        .status(201)
        .json({ message: 'Usuário cadastrado com sucesso!', newStudent })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao conectar com servidor', error })
    }
  }
}
