const Trainee = require('../models/Trainee')

module.exports = class TraineeController {
  static async createTrainee(req, res) {
    res.status(200).json({ message: 'Rota estagiários ok' })
  }
}
