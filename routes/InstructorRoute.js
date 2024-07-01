const InstructorController = require('../controllers/InstructorController')

const router = require('express').Router()

router.get('/', InstructorController.createInstructor)

module.exports = router
