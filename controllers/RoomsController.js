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

    const existsRoom = await Rooms.findOne({ where: { title } })
    if (existsRoom) {
      return res.status(422).json({ message: 'Sala já cadastrada!' })
    }

    try {
      const titleRoomNotSpace = title.replace(/\s+/g, '')
      const newRoom = await Rooms.create({
        name,
        capacity,
        title: titleRoomNotSpace,
      })

      res.status(201).json({ message: 'Sala cadastrada com sucesso!', newRoom })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }

  static async editRoom(req, res) {
    const { id } = req.params
    const { name, capacity, title } = req.body

    if (!name) {
      return res.status(422).json({ message: 'Campo nome é obrigatório!' })
    }

    if (!title) {
      return res.status(422).json({ message: 'Campo título é obrigatório!' })
    }

    const titleRoomNotSpace = title.replace(/\s+/g, '')

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

    const existsRoom = await Rooms.findOne({
      where: { title: titleRoomNotSpace },
    })
    if (existsRoom) {
      return res.status(422).json({ message: 'Sala já cadastrada!' })
    }

    const room = await Rooms.findByPk(id)
    if (!room) {
      return res.status(404).json({ message: 'Sala não encontrada!' })
    }

    try {
      await Rooms.update(
        {
          name,
          capacity,
          title: titleRoomNotSpace,
        },
        { where: { _id: id } },
      )

      res.status(200).json({ message: 'Sala atualizada com sucesso!' })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }
}
