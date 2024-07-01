const Rooms = require('../models/Rooms')

module.exports = class RoomsController {
  static async createRooms(req, res) {
    res.status(200).json({ message: 'Rota salas ok' })
  }
}
