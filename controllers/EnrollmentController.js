const Course = require('../models/Course')
const Enrollment = require('../models/Enrollment')
const Students = require('../models/Students')

module.exports = class EnrollmentController {
  static async createEnrollment(req, res) {
    const { courseName, studentEmail } = req.body

    if (!courseName) {
      return res.status(422).json({ message: 'O nome da sala é obrigatório!' })
    }

    if (!studentEmail || !Array.isArray(studentEmail)) {
      return res.status(422).json({
        message: 'Os e-mail dos alunos são obrigatórios!',
      })
    }

    try {
      const course = await Course.findOne({ where: { name: courseName } })
      if (!course) {
        return res.status(404).json({ message: 'Curso inexistente!' })
      }

      const students = await Students.findAll({
        where: {
          email: studentEmail,
        },
      })

      if (students.length !== studentEmail.length) {
        return res
          .status(404)
          .json({ message: 'Um ou mais alunos não foram encontrados!' })
      }

      await course.addStudents(students)

      res.status(201).json({ message: 'Inscrições realizadas com sucesso!' })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Erro ao conectar com o servidor!', error })
    }
  }

  static async getStudentsByCourse(req, res) {
    const { courseId } = req.params

    try {
      const course = await Course.findByPk(courseId, {
        include: {
          model: Students,
          through: { attributes: [] },
        },
      })

      if (!course) {
        return res.status(404).json({ message: 'Curso não encontrado!' })
      }

      res.status(200).json(course.Students)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar os alunos!' })
    }
  }
}
