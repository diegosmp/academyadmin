const TraineeController = require('../controllers/TraineeController')

const router = require('express').Router()

router.post('/create', TraineeController.createTrainee)
router.patch('/edit/:id', TraineeController.editTrainee)

module.exports = router
