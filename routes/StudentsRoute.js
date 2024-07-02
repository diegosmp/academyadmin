const StudentsController = require('../controllers/StudentsController')
const verifyToken = require('../helpers/verifyToken')

const router = require('express').Router()

router.post('/create', verifyToken, StudentsController.createStudents)
router.patch('/edit/:id', StudentsController.editStudents)

module.exports = router
