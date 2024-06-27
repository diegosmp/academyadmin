const CoordinationOfficeController = require('../controllers/CoordinationOfficeController')
const imageUpload = require('../helpers/imageUpload')
const verifyToken = require('../helpers/verifyToken')

const router = require('express').Router()

router.post(
  '/signup',
  imageUpload.single('image'),
  CoordinationOfficeController.signup,
)
router.post('/signin', CoordinationOfficeController.signin)
router.get('/checktoken', CoordinationOfficeController.checkUserToken)
router.patch(
  '/edit/:id',
  verifyToken,
  imageUpload.single('image'),
  CoordinationOfficeController.editCoord,
)
router.get('/profile/:id', CoordinationOfficeController.getCoordById)

module.exports = router
