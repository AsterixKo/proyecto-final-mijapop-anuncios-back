const express = require('express');
const subcategoryController = require('../controller/subcategoryController');

const router = express.Router();

router.get('/', subcategoryController.index);
router.get('/category/:id', subcategoryController.findByCategoryId);
router.get('/:id', subcategoryController.showById);
router.get('/name/:name', subcategoryController.findByName);
router.post('/', subcategoryController.create);
router.delete('/:id', subcategoryController.delete);
router.put('/:id', subcategoryController.update);

module.exports = router;