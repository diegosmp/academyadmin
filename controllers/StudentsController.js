const Students = require('../models/Students')

module.exports = class StudentsController {
  static async createStudents(req, res) {
    res.status(200).json({ message: 'Rota estudantes ok' })
  }
}
