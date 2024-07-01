const InstructorController = require('../controllers/InstructorController')

const router = require('express').Router()

router.post('/create', InstructorController.createInstructor)

module.exports = router
