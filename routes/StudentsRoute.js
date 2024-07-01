const StudentsController = require('../controllers/StudentsController')

const router = require('express').Router()

router.get('/', StudentsController.createStudents)

module.exports = router
