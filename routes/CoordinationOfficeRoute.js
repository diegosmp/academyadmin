const CoordinationOfficeController = require('../controllers/CoordinationOfficeController')

const router = require('express').Router()

router.post('/signup', CoordinationOfficeController.signup)

module.exports = router