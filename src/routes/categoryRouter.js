const express = require('express');
const categoryController = require('../controller/categoryController');

const router = express.Router();

router.get('/', categoryController.index);
router.get('/:id', categoryController.showById);
router.get('/name/:name', categoryController.findByName);
router.post('/', categoryController.create);
router.delete('/:id', categoryController.delete);
router.put('/:id', categoryController.update);

module.exports = router;