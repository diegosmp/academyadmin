const { DataTypes } = require('sequelize')
const conn = require('../config/conn')
const Rooms = require('./Rooms')
const Instructor = require('./Instructor')
const Trainee = require('./Trainee')
const Students = require('./Students')
const Enrollment = require('./Enrollment')

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

  roomId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Rooms',
      key: '_id',
    },
  },

  instructorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Instructors',
      key: '_id',
    },
  },

  traineeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Trainees',
      key: '_id',
    },
  },
})

Rooms.hasMany(Course, { foreignKey: 'roomId' })
Course.belongsTo(Rooms, { foreignKey: 'roomId' })
Instructor.hasMany(Course, { foreignKey: 'instructorId' })
Course.belongsTo(Instructor, { foreignKey: 'instructorId' })
Trainee.hasMany(Course, { foreignKey: 'traineeId' })
Course.belongsTo(Trainee, { foreignKey: 'traineeId' })

Course.belongsToMany(Students, { through: Enrollment, foreignKey: 'courseId' })
Students.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: 'studentId',
})

module.exports = Course
