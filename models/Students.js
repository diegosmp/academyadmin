const { DataTypes } = require('sequelize')
const conn = require('../config/conn')

const Students = conn.define('Students', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    defaultValue: 'Email não cadastrado',
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
})

module.exports = Students
