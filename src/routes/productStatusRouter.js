const express = require('express');
const productStatusController = require('../controller/productStatusController');

const router = express.Router();

router.get('/', productStatusController.index);
router.get('/category/:id', productStatusController.findByCategoryId);
router.get('/:id', productStatusController.showById);
router.get('/name/:name', productStatusController.findByName);
router.post('/', productStatusController.create);
router.delete('/:id', productStatusController.delete);
router.put('/:id', productStatusController.update);

module.exports = router;