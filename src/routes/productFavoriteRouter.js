const express = require('express');
const productFavoriteController = require('../controller/productFavoriteController');

const router = express.Router();

router.get('/', productFavoriteController.index);
router.get('/productAndUser/:idProduct/:idUserFavorite', productFavoriteController.findByProductIdAndUserFavoriteId);
router.get('/user/:idUserFavorite', productFavoriteController.findByUserFavoriteId);
router.get('/:id', productFavoriteController.showById);
router.post('/', productFavoriteController.create);
router.delete('/:id', productFavoriteController.delete);
// router.put('/:id', productFavoriteController.update);

module.exports = router;