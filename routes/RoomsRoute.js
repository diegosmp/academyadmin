const RoomsController = require('../controllers/RoomsController')
const verifyToken = require('../helpers/verifyToken')

const router = require('express').Router()

router.post('/create', verifyToken, RoomsController.createRooms)
router.patch('/edit/:id', RoomsController.editRoom)

module.exports = router
