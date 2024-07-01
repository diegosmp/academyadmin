const validator = require('validator')

const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    throw new Error('Formato de e-mail inválido')
  }
}

module.exports = validateEmail
