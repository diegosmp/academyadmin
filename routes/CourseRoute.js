const CourseController = require('../controllers/CourseController')
const router = require('express').Router()

router.get('/', CourseController.createCourse)

module.exports = router
