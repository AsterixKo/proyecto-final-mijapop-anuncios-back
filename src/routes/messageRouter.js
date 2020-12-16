const express = require('express');
const messageController = require('../controller/messageController');

const router = express.Router();

router.get('/:id', messageController.showById);
router.get('/conversationId/:conversationId', messageController.findByConversationId);
router.post('/', messageController.create);
router.delete('/:id', messageController.delete);

module.exports = router;