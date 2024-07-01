const { DataTypes } = require('sequelize')
const conn = require('../config/conn')

const Rooms = conn.define('Rooms', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

module.exports = Rooms
