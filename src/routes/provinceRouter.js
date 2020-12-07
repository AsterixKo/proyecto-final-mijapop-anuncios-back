const express = require('express');
const provinceController = require('../controller/provinceController');

const router = express.Router();

router.get('/', provinceController.index);
router.get('/:id', provinceController.showById);
router.get('/name/:name', provinceController.findByName);
router.post('/', provinceController.create);
router.delete('/:id', provinceController.delete);
router.put('/:id', provinceController.update);

module.exports = router;