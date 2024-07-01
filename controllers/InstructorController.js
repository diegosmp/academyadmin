const Instructor = require('../models/Instructor')
const validateEmail = require('../helpers/validateEmail')

module.exports = class InstructorController {
  static async createInstructor(req, res) {
    const { firstname, lastname, email, cpf } = req.body

    if (!firstname) {
      return res
        .status(422)
        .json({ message: 'O campo primeiro nome é obrigatório!' })
    }

    if (!lastname) {
      return res
        .status(422)
        .json({ message: 'O campo ultimo nome é obrigatório!' })
    }

    if (!email) {
      return res.status(422).json({ message: 'O campo e-mail é obrigatório!' })
    }

    try {
      validateEmail(email)
    } catch (error) {
      return res.status(422).json({ message: error.message })
    }

    const instructor = await Instructor.findOne({ where: { email } })

    if (instructor) {
      return res.status(422).json({ message: 'E-mail já cadastrado!' })
    }

    if (!cpf) {
      return res.status(422).json({ message: 'O campo CPF é obrigatório!' })
    }

    const cpfWithoutSpecialChars = cpf.replace(/[.-]/g, '')
    const characterSpecial = /^\d+$/.test(cpfWithoutSpecialChars)

    if (cpfWithoutSpecialChars.length !== 11 || !characterSpecial) {
      return res.status(422).json({ message: 'CPF inválido!' })
    }

    const existsInstructor = await Instructor.findOne({
      where: { cpf: cpfWithoutSpecialChars },
    })
    if (existsInstructor) {
      return res.status(422).json({ message: 'CPF já cadastrato!' })
    }

    try {
      const newInstructor = await Instructor.create({
        firstname,
        lastname,
        email,
        cpf: cpfWithoutSpecialChars,
      })
      res
        .status(201)
        .json({ message: 'Professor cadastrado com sucesso!', newInstructor })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }
  static async editInstructor(req, res) {
    const { id } = req.params
    const { firstname, lastname, email } = req.body

    console.log(firstname)
    console.log(lastname)
    console.log(email)

    if (!firstname) {
      return res
        .status(422)
        .json({ message: 'O campo primeiro nome é obrigatório!' })
    }

    if (!lastname) {
      return res
        .status(422)
        .json({ message: 'O campo ultimo nome é obrigatório!' })
    }

    if (!email) {
      return res.status(422).json({ message: 'O campo e-mail é obrigatório!' })
    }

    try {
      validateEmail(email)
    } catch (error) {
      return res.status(422).json({ message: error.message })
    }

    const instructor = await Instructor.findByPk(id)

    if (!instructor) {
      return res.status(422).json({ message: 'Professor não cadastrado!' })
    }

    try {
      await Instructor.update(
        {
          firstname,
          lastname,
          email,
        },
        { where: { _id: id } },
      )

      res.status(200).json({ message: 'Professor atualizado com sucesso!' })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }
}
