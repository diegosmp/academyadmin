const CourseController = require('../controllers/CourseController')
const verifyToken = require('../helpers/verifyToken')
const router = require('express').Router()

router.post('/create', verifyToken, CourseController.createCourse)
router.patch('/edit/:id', verifyToken, CourseController.editCourse)

module.exports = router
