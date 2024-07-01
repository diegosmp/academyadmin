const RoomsController = require('../controllers/RoomsController')

const router = require('express').Router()

router.post('/create', RoomsController.createRooms)

module.exports = router
