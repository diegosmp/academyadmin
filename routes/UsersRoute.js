const UsersController = require('../controllers/UsersController')
const imageUpload = require('../helpers/imageUpload')
const verifyToken = require('../helpers/verifyToken')

const router = require('express').Router()

router.post('/signup', imageUpload.single('image'), UsersController.signup)
router.post('/signin', UsersController.signin)
router.get('/checktoken', UsersController.checkUserToken)
router.patch(
  '/edit/:id',
  verifyToken,
  imageUpload.single('image'),
  UsersController.editUser,
)
router.get('/profile/:id', UsersController.getUserById)

module.exports = router
