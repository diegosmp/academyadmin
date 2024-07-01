const { DataTypes } = require('sequelize')
const conn = require('../config/conn')

const Enrollment = conn.define('Enrollments', {
  courseId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: 'Course',
      key: '_id',
    },
  },
  studentId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: 'Students',
      key: '_id',
    },
  },
})

module.exports = Enrollment
