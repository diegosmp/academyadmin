const EnrollmentController = require('../controllers/EnrollmentController')
const verifyToken = require('../helpers/verifyToken')
const router = require('express').Router()

router.post('/enroll', verifyToken, EnrollmentController.createEnrollment)
router.get(
  '/courses/:courseId/students',
  EnrollmentController.getStudentsByCourse,
)

module.exports = router
