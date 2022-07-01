const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workout');
const verifyToken = require('../util/verifyToken');

router.get('/', workoutController.getAll);
router.get('/:id', workoutController.findById);
router.get('/userId/:userId', workoutController.findByUserId);
router.post('/', verifyToken.verifyTokenFromClient, workoutController.create);
router.put('/', verifyToken.verifyTokenFromClient, workoutController.update);
router.delete('/:id', verifyToken.verifyTokenFromClient, workoutController.destroy);

module.exports = router;