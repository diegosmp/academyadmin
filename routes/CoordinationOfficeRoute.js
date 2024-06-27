const CoordinationOfficeController = require('../controllers/CoordinationOfficeController')
const imageUpload = require('../helpers/imageUpload')

const router = require('express').Router()

router.post('/signup',imageUpload.single('image'), CoordinationOfficeController.signup)

module.exports = router