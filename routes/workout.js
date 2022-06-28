const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workout');

router.get('/', workoutController.getAll);
router.get('/:id', workoutController.findById);
router.get('/userId/:userId', workoutController.findByUserId);
router.post('/', workoutController.create);
router.put('/', workoutController.update);
router.delete('/:id', workoutController.destroy);

module.exports = router;