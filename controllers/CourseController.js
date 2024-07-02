const { Op } = require('sequelize')
const Course = require('../models/Course')
const Instructor = require('../models/Instructor')
const Rooms = require('../models/Rooms')
const Trainee = require('../models/Trainee')

module.exports = class CourseController {
  static async createCourse(req, res) {
    const {
      name,
      hourInitial,
      hourEnd,
      dateInitial,
      dateEnd,
      dayOfWeek,
      roomName,
      instructorCPF,
      traineeName,
    } = req.body

    const requiredFields = [
      { field: roomName, message: 'O nome da sala é obrigatório!' },
      { field: instructorCPF, message: 'O CPF do professor é obrigatório!' },
      { field: traineeName, message: 'O email do estagiário é obrigatório!' },
      { field: name, message: 'O nome é obrigatório!' },
      { field: hourInitial, message: 'O horário inicial é obrigatório!' },
      { field: hourEnd, message: 'O horário final é obrigatório!' },
      { field: dateInitial, message: 'A data inicial é obrigatório!' },
      { field: dateEnd, message: 'A data final é obrigatório!' },
      { field: dayOfWeek, message: 'O dia da semana é obrigatório!' },
    ]

    for (const { field, message } of requiredFields) {
      if (!field) {
        return res.status(422).json({ message })
      }
    }

    if (!name) {
      return res.status(422).json({ message: 'O nome é obrigatório!' })
    }

    if (!hourInitial) {
      return res
        .status(422)
        .json({ message: 'O horário inicial é obrigatório!' })
    }

    if (!hourEnd) {
      return res.status(422).json({ message: 'O horário final é obrigatório!' })
    }

    if (!dateInitial) {
      return res.status(422).json({ message: 'A data inicial é obrigatório!' })
    }

    if (!dateEnd) {
      return res.status(422).json({ message: 'A data final é obrigatório!' })
    }

    if (!dayOfWeek) {
      return res.status(422).json({ message: 'O dia da semana é obrigatório!' })
    }

    const sanitizedName = name.replace(/\s+/g, '')

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

    if (!timeRegex.test(hourInitial)) {
      return res
        .status(422)
        .json({ message: 'O horário inicial deve estar no formato HH:MM:SS!' })
    }

    if (!timeRegex.test(hourEnd)) {
      return res
        .status(422)
        .json({ message: 'O horário final deve estar no formato HH:MM:SS!' })
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(dateInitial)) {
      return res
        .status(422)
        .json({ message: 'A data inicial deve estar no formato YYYY-MM-DD!' })
    }

    if (!dateRegex.test(dateEnd)) {
      return res
        .status(422)
        .json({ message: 'A data final deve estar no formato YYYY-MM-DD!' })
    }

    if (new Date(dateEnd) <= new Date(dateInitial)) {
      return res
        .status(422)
        .json({ message: 'A data final deve ser posterior à data inicial!' })
    }

    const validDaysOfWeek = [
      'segunda',
      'terça',
      'quarta',
      'quinta',
      'sexta',
      'sábado',
      'domingo',
    ]
    if (!validDaysOfWeek.includes(dayOfWeek)) {
      return res
        .status(422)
        .json({ message: 'O dia da semana deve ser um valor válido!' })
    }

    const room = await Rooms.findOne({ where: { title: roomName } })

    if (!room) {
      return res.status(404).json({ message: 'Sala inexistente!' })
    }

    const instructor = await Instructor.findOne({
      where: { cpf: instructorCPF },
    })

    if (!instructor) {
      return res.status(404).json({ message: 'Professor inexistente!' })
    }

    const trainee = await Trainee.findOne({ where: { email: traineeName } })

    if (!trainee) {
      return res.status(404).json({ message: 'Estagiário inexistente!' })
    }

    const conflictingCourses = await Course.findAll({
      where: {
        [Op.or]: [
          { roomId: room._id },
          { instructorId: instructor._id },
          { traineeId: trainee._id },
        ],
        dayOfWeek,
        [Op.and]: [
          { hourInitial: { [Op.lt]: hourEnd } },
          { hourEnd: { [Op.gt]: hourInitial } },
        ],
      },
    })

    if (conflictingCourses.length > 0) {
      return res.status(409).json({ message: 'Conflito de horário detectado!' })
    }

    try {
      const newCourse = await Course.create({
        name: sanitizedName,
        hourInitial,
        hourEnd,
        dateInitial,
        dateEnd,
        dayOfWeek: dayOfWeek,
        roomId: room._id,
        instructorId: instructor._id,
        traineeId: trainee._id,
      })

      res
        .status(201)
        .json({ message: 'Curso cadastrado com sucesso!', newCourse })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }
}
