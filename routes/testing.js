const express = require('express');
const router = express.Router();
const testingController = require('../controllers/testing');
const verifyToken = require('../util/verifyToken');

router.get('/', verifyToken.verifyTokenFromClient, testingController.getAll);

module.exports = router;