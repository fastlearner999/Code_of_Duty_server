const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goal')

router.get('/', goalController.getAll)
router.get('/:id', goalController.findById)
router.get('/userId/:userId', goalController.findByUserId);
router.post('/', goalController.create)
router.put('/', goalController.update)
router.delete('/:id', goalController.destroy)

module.exports = router;
