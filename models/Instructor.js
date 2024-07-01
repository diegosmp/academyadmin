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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
})

module.exports = Instructor
