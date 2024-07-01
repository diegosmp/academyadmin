const RoomsController = require('../controllers/RoomsController')

const router = require('express').Router()

router.get('/', RoomsController.createRooms)

module.exports = router
