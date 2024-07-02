const { DataTypes } = require('sequelize')
const conn = require('../config/conn')
const Instructor = require('./Instructor')
const Trainee = require('./Trainee')
const Enrollment = require('./Enrollment')
const Students = require('./Students')

const Course = conn.define('Courses', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  room: {
    type: DataTypes.ENUM,
    values: ['londres', 'berlim', 'moscow'],
    allowNull: false,
  },

  hourInitial: {
    type: DataTypes.TIME,
    allowNull: false,
  },

  hourEnd: {
    type: DataTypes.TIME,
    allowNull: false,
  },

  dateInitial: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  dateEnd: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  dayOfWeek: {
    type: DataTypes.ENUM,
    values: [
      'segunda',
      'terça',
      'quarta',
      'quinta',
      'sexta',
      'sábado',
      'domingo',
    ],
    allowNull: false,
  },

  instructorId: {
    type: DataTypes.UUID,
    references: {
      model: 'Instructors',
      key: '_id',
    },
  },

  traineeId: {
    type: DataTypes.UUID,
    references: {
      model: 'Trainees',
      key: '_id',
    },
  },
})

Instructor.hasMany(Course, { foreignKey: 'instructorId' })
Course.belongsTo(Instructor, { foreignKey: 'instructorId' })

Trainee.hasMany(Course, { foreignKey: 'traineeId' })
Course.belongsTo(Trainee, { foreignKey: 'traineeId' })

Course.belongsToMany(Students, {
  through: Enrollment,
  foreignKey: 'courseId',
})
Students.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: 'studentId',
})

module.exports = Course
