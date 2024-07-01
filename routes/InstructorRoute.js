const InstructorController = require('../controllers/InstructorController')

const router = require('express').Router()

router.post('/create', InstructorController.createInstructor)
router.patch('/edit/:id', InstructorController.editInstructor)

module.exports = router
