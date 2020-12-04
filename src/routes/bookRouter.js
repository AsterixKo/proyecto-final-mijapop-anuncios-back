const express = require('express');
const bookController = require('../controller/bookController');

const router = express.Router();

router.get('/', bookController.index);
router.get('/:id', bookController.showById);
router.post('/', bookController.create);
router.delete('/:id', bookController.delete);
router.put('/:id', bookController.update);

module.exports = router;