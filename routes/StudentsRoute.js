const StudentsController = require('../controllers/StudentsController')

const router = require('express').Router()

router.post('/create', StudentsController.createStudents)
router.patch('/edit/:id', StudentsController.editStudents)

module.exports = router
