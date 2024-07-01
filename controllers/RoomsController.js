const Rooms = require('../models/Rooms')

module.exports = class RoomsController {
  static async createRooms(req, res) {
    const { name, capacity, title } = req.body
    if (!name) {
      return res.status(422).json({ message: 'Campo nome é obrigatório!' })
    }

    if (!title) {
      return res.status(422).json({ message: 'Campo título é obrigatório!' })
    }

    if (!capacity) {
      return res
        .status(422)
        .json({ message: 'Campo capacidade é obrigatório!' })
    }

    if (isNaN(capacity)) {
      return res.status(422).json({ message: 'Capacidade deve ser um número!' })
    }

    const numericCapacity = parseInt(capacity, 10)

    if (numericCapacity < 6) {
      return res
        .status(422)
        .json({ message: 'A sala tem que ter pelo menos 6 alunos!' })
    }

    const existsRoom = await Rooms.findOne({ where: { name } })
    if (existsRoom) {
      return res.status(422).json({ message: 'Sala já cadastrada!' })
    }

    try {
      const newRoom = await Rooms.create({
        name,
        capacity,
        title,
      })

      res.status(201).json({ message: 'Sala cadastrada com sucesso!', newRoom })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }
}
