const RoomsController = require('../controllers/RoomsController')

const router = require('express').Router()

router.post('/create', RoomsController.createRooms)
router.patch('/edit/:id', RoomsController.editRoom)

module.exports = router
