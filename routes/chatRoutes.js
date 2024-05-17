const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

router.get('/', chatController.getAllChats);
router.get('/:id', chatController.getChatById);
router.post('/', chatController.createChat);
router.put('/:id', chatController.updateChat);
router.delete('/:id', chatController.deleteChat);

module.exports = router;
