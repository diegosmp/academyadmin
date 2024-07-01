const Enrollment = require('../models/Enrollment')

module.exports = class EnrollmentController {
  static async createEnrollment(req, res) {
    res.status(200).json({ message: 'Rota matriculas ok' })
  }
}
