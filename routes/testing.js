const express = require('express');
const router = express.Router();
const testingController = require('../controllers/testing');
const verifyTokenFromBrowser = require('verifyToken');

router.get('/', verifyTokenFromBrowser, testingController.getAll);

module.exports = router;