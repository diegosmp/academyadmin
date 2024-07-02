const Course = require('../models/Course')
const Enrollment = require('../models/Enrollment')
const Students = require('../models/Students')

module.exports = class EnrollmentController {
  static async createEnrollment(req, res) {
    const { courseId, studentIds } = req.body

    if (!courseId) {
      return res.status(422).json({ message: 'O ID do curso é obrigatório!' })
    }

    if (!studentIds || !Array.isArray(studentIds)) {
      return res.status(422).json({
        message:
          'Os IDs dos alunos são obrigatórios e devem estar em um array!',
      })
    }

    try {
      const course = await Course.findByPk(courseId)
      if (!course) {
        return res.status(404).json({ message: 'Curso inexistente!' })
      }

      const students = await Students.findAll({
        where: {
          _id: studentIds,
        },
      })

      if (students.length !== studentIds.length) {
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
      res.status(500).json({ message: 'Erro ao buscar os alunos!', error })
    }
  }
}
