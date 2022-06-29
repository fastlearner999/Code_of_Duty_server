const express = require('express');
const router = express.Router();
const testingController = require('../controllers/testing');

router.get('/', testingController.getAll);

module.exports = router;