const express = require('express');
const conversationController = require('../controller/conversationController');

const router = express.Router();

router.get('/:id', conversationController.showById);
router.get('/userOwnerIdOrUserBuyerId/:userOwnerId/:userBuyerId', conversationController.findByUserOwnerIdOrUserBuyerId);
router.post('/', conversationController.create);
router.delete('/:id', conversationController.delete);

module.exports = router;