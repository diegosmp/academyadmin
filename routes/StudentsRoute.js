const StudentsController = require('../controllers/StudentsController')

const router = require('express').Router()

router.post('/create', StudentsController.createStudents)

module.exports = router
