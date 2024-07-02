const InstructorController = require('../controllers/InstructorController')
const verifyToken = require('../helpers/verifyToken')

const router = require('express').Router()

router.post('/create', verifyToken, InstructorController.createInstructor)
router.patch('/edit/:id', InstructorController.editInstructor)

module.exports = router
