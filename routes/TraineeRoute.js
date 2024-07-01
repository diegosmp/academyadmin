const TraineeController = require('../controllers/TraineeController')

const router = require('express').Router()

router.get('/', TraineeController.createTrainee)

module.exports = router
