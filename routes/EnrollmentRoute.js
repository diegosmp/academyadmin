const EnrollmentController = require('../controllers/EnrollmentController')
const router = require('express').Router()

router.get('/', EnrollmentController.createEnrollment)

module.exports = router
