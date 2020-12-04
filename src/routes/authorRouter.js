const express = require('express');
const authorController = require('../controller/authorController');

const router = express.Router();

router.get('/', authorController.index);
router.get('/:id', authorController.showById);
router.post('/', authorController.create);
router.delete('/:id', authorController.delete);
router.put('/:id', authorController.update);

module.exports = router;