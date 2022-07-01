const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content');
const verifyToken = require('../util/verifyToken');

router.get('/', verifyToken.verifyTokenFromClient, contentController.getAll);
router.get('/:id', verifyToken.verifyTokenFromClient, contentController.findById);

module.exports = router;
