const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.get('/', productController.index);
router.get('/search/:query', productController.search);
router.get('/category/:id', productController.findByCategoryId);
router.get('/province/:id', productController.findByProvinceId);
router.get('/subcategory/:id', productController.findBySubcategoryId);
router.get('/town/:town', productController.findByTown);
router.get('/userOwner/:id', productController.findByUserOwnerId);
router.get('/userOwnerAndIsSold/:id', productController.findByUserOwnerIdAndIsSold);
router.get('/userOwnerAndIsNotSold/:id', productController.findByUserOwnerIdAndIsNotSold);
router.get('/:id', productController.showById);
router.post('/', productController.create);
router.delete('/:id', productController.delete);
router.put('/:id', productController.update);

module.exports = router;