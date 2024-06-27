require('dotenv').config()
const { Sequelize } = require('sequelize')

const { DATABASE, USER, PASSWORD, HOST } = process.env

const conn = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: 'postgres',
})

module.exports = conn
