const { Op } = require('sequelize')
const Course = require('../models/Course')
const Instructor = require('../models/Instructor')
const Trainee = require('../models/Trainee')

module.exports = class CourseController {
  static async createCourse(req, res) {
    const {
      name,
      title,
      room,
      hourInitial,
      hourEnd,
      dateInitial,
      dateEnd,
      dayOfWeek,
      instructorCPF,
      traineeName,
    } = req.body

    const requiredFields = [
      { field: instructorCPF, message: 'O CPF do professor é obrigatório!' },
      { field: traineeName, message: 'O email do estagiário é obrigatório!' },
      { field: name, message: 'O nome é obrigatório!' },
      { field: title, message: 'ID da sala obrigatória!' },
      { field: room, message: 'A sala é obrigatória!' },
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

    const sanitizedName = name.replace(/\s+/g, '')
    const sanitizedRoom = room.replace(/\s+/g, '').toLowerCase()

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

    const validRoomsName = ['londres', 'berlim', 'moscow']

    if (!validRoomsName.includes(room)) {
      return res.status(422).json({ message: 'Digite o nome de sala correta!' })
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
        room: sanitizedRoom,
        hourInitial,
        hourEnd,
        dateInitial,
        dateEnd,
        dayOfWeek,
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
