const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goal');
const verifyToken = require('../util/verifyToken');

router.get('/', verifyToken.verifyTokenFromClient, goalController.getAll)
router.get('/:id', verifyToken.verifyTokenFromClient, goalController.findById)
router.get('/userId/:userId', verifyToken.verifyTokenFromClient, goalController.findByUserId);
router.post('/', verifyToken.verifyTokenFromClient, goalController.create)
router.put('/', verifyToken.verifyTokenFromClient, goalController.update)
router.delete('/:id', verifyToken.verifyTokenFromClient, goalController.destroy)

module.exports = router;
