const TraineeController = require('../controllers/TraineeController')
const verifyToken = require('../helpers/verifyToken')

const router = require('express').Router()

router.post('/create', verifyToken, TraineeController.createTrainee)
router.patch('/edit/:id', TraineeController.editTrainee)

module.exports = router
