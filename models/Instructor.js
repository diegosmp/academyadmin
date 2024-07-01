const { DataTypes } = require('sequelize')
const conn = require('../config/conn')

const Instructor = conn.define('Instructors', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  firstname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  lastname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = Instructor
