const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const verifyToken = require('../util/verifyToken');

router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/', userController.getAll);
router.get('/:id', userController.findById);
router.post('/', userController.create);
router.put('/', verifyToken.verifyTokenFromClient, userController.update);
router.delete('/:id', verifyToken.verifyTokenFromClient, userController.destroy);

module.exports = router;