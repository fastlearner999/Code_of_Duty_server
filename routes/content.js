const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content')

router.get('/', contentController.getAll);
router.get('/:id', contentController.findById);

module.exports = router;
