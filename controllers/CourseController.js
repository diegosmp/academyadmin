const Course = require('../models/Course')

module.exports = class CourseController {
  static async createCourse(req, res) {
    res.status(200).json({ message: 'Rota cursos ok' })
  }
}
