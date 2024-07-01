const TraineeController = require('../controllers/TraineeController')

const router = require('express').Router()

router.post('/create', TraineeController.createTrainee)

module.exports = router
