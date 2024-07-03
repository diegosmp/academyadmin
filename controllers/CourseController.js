const { Op } = require('sequelize')
const Course = require('../models/Course')
const Instructor = require('../models/Instructor')
const Trainee = require('../models/Trainee')

module.exports = class CourseController {
  static async createCourse(req, res) {
    const {
      name,
      course,
      room,
      capacity,
      hourInitial,
      hourEnd,
      dateInitial,
      dateEnd,
      dayOfWeek,
      instructorEmail,
      traineeName,
    } = req.body

    const requiredFields = [
      {
        field: instructorEmail,
        message: 'O E-mail do professor é obrigatório!',
      },
      { field: name, message: 'O nome da sala é obrigatório!' },
      { field: course, message: 'O nome do curso é obrigatório!' },
      { field: room, message: 'O local da sala é obrigatória!' },
      { field: capacity, message: 'A quantidade é obrigatória!' },
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
    const sanitizedRoom = room.replace(/\s+/g, '')
    const itsNumber = /^[0-9]+$/.test(capacity)

    if (!itsNumber) {
      return res
        .status(422)
        .json({ message: 'O campo de capacidade precisa ser um número!' })
    }

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

    if (new Date(dateEnd) < new Date(dateInitial)) {
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

    const validRoomsName = ['Londres', 'Berlim', 'Moscow']

    if (!validRoomsName.includes(room)) {
      return res.status(422).json({ message: 'Digite o nome de sala correta!' })
    }

    const instructor = await Instructor.findOne({
      where: { email: instructorEmail },
    })

    if (!instructor) {
      return res.status(404).json({ message: 'Professor inexistente!' })
    }

    let traineeId = null
    if (traineeName) {
      const trainee = await Trainee.findOne({ where: { email: traineeName } })

      if (!trainee) {
        return res.status(404).json({ message: 'Estagiário inexistente!' })
      }
      traineeId = trainee._id
    }

    const conflictingCourses = await Course.findAll({
      where: {
        [Op.or]: [{ instructorId: instructor._id }, { traineeId }],
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
        course,
        room: sanitizedRoom,
        capacity,
        hourInitial,
        hourEnd,
        dateInitial,
        dateEnd,
        dayOfWeek,
        instructorId: instructor._id,
        traineeId,
      })

      res
        .status(201)
        .json({ message: 'Curso cadastrado com sucesso!', newCourse })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }

  static async editCourse(req, res) {
    const { id } = req.params
    const {
      name,
      course,
      room,
      capacity,
      hourInitial,
      hourEnd,
      dateInitial,
      dateEnd,
      dayOfWeek,
      instructorEmail,
      traineeName,
    } = req.body

    const requiredFields = [
      {
        field: instructorEmail,
        message: 'O E-mail do professor é obrigatório!',
      },
      { field: name, message: 'O nome da sala é obrigatório!' },
      { field: course, message: 'O nome do curso é obrigatório!' },
      { field: room, message: 'O local da sala é obrigatória!' },
      { field: capacity, message: 'A quantidade é obrigatória!' },
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
    const sanitizedRoom = room.replace(/\s+/g, '')
    const itsNumber = /^[0-9]+$/.test(capacity)

    if (!itsNumber) {
      return res
        .status(422)
        .json({ message: 'O campo de capacidade precisa ser um número!' })
    }

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

    if (new Date(dateEnd) < new Date(dateInitial)) {
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

    const validRoomsName = ['Londres', 'Berlim', 'Moscow']

    if (!validRoomsName.includes(room)) {
      return res.status(422).json({ message: 'Digite o nome de sala correta!' })
    }

    const instructor = await Instructor.findOne({
      where: { email: instructorEmail },
    })

    if (!instructor) {
      return res.status(404).json({ message: 'Professor inexistente!' })
    }

    let traineeId = null
    if (traineeName) {
      const trainee = await Trainee.findOne({ where: { email: traineeName } })

      if (!trainee) {
        return res.status(404).json({ message: 'Estagiário inexistente!' })
      }
      traineeId = trainee._id
    }

    try {
      const courseToUpdate = await Course.findByPk(id)

      if (!courseToUpdate) {
        return res.status(404).json({ message: 'Curso não encontrado!' })
      }

      if (courseToUpdate.dayOfWeek !== dayOfWeek) {
        const conflictingCourses = await Course.findAll({
          where: {
            [Op.and]: [
              { id: { [Op.ne]: id } },
              { dayOfWeek },
              { instructorId: instructor._id },
              { room: sanitizedRoom },
              { hourInitial: { [Op.lt]: hourEnd } },
              { hourEnd: { [Op.gt]: hourInitial } },
              traineeId ? { traineeId } : {},
            ],
          },
        })

        if (conflictingCourses.length > 0) {
          return res
            .status(409)
            .json({ message: 'Conflito de horário detectado!' })
        }
      }

      await courseToUpdate.update({
        name: sanitizedName,
        course: String(course),
        room: sanitizedRoom,
        capacity,
        hourInitial,
        hourEnd,
        dateInitial,
        dateEnd,
        dayOfWeek,
        instructorId: instructor._id,
        traineeId,
      })

      res
        .status(200)
        .json({ message: 'Curso atualizado com sucesso!', courseToUpdate })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }
}
