const EnrollmentController = require('../controllers/EnrollmentController')
const router = require('express').Router()

router.post('/enroll', EnrollmentController.createEnrollment)
router.get(
  '/courses/:courseId/students',
  EnrollmentController.getStudentsByCourse,
)

module.exports = router
