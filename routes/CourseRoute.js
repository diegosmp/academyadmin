const CourseController = require('../controllers/CourseController')
const router = require('express').Router()

router.post('/create', CourseController.createCourse)

module.exports = router
