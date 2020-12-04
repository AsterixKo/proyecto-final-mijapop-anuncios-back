const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/', userController.index);
router.get('/:id', userController.showById);
router.get('/email/:email', userController.findByEmail);
router.post('/', userController.create);
router.delete('/:id', userController.delete);
router.put('/:id', userController.update);

module.exports = router;