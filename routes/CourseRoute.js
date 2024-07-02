const CourseController = require('../controllers/CourseController')
const verifyToken = require('../helpers/verifyToken')
const router = require('express').Router()

router.post('/create', verifyToken, CourseController.createCourse)

module.exports = router
