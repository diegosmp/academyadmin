const Trainee = require('../models/Trainee')
const validateEmail = require('../helpers/validateEmail')

module.exports = class TraineeController {
  static async createTrainee(req, res) {
    const { firstname, lastname, email } = req.body

    if (!firstname) {
      return res.status(422).json({ message: 'Primeiro nome é obrigatório!' })
    }
    if (!lastname) {
      return res.status(422).json({ message: 'Segundo nome é obrigatório!' })
    }
    if (!email) {
      return res.status(422).json({ message: 'E-mail é obrigatório!' })
    }

    try {
      validateEmail(email)
    } catch (error) {
      return res.status(422).json({ message: error.message })
    }

    const existsTrainee = await Trainee.findOne({ where: { email } })

    if (existsTrainee) {
      return res.status(422).json({ message: 'Estagiário já cadastrado!' })
    }

    try {
      const newTrainee = await Trainee.create({
        firstname,
        lastname,
        email,
      })
      res
        .status(201)
        .json({ message: 'Estagiário cadastrado com sucesso!', newTrainee })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao conectar com servidor!' })
    }
  }
}
