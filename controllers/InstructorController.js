const Instructor = require('../models/Instructor')

module.exports = class InstructorController {
  static async createInstructor(req, res) {
    res.status(200).json({ message: 'Rota professor ok' })
  }
}
