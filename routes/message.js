const router = require('express').Router();
const messageController = require('../controller/messageController');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/', verifyToken, messageController.sendMessage);
router.get('/', verifyToken, messageController.getAllMessages);
router.get('/:id', verifyToken, messageController.getMessageById);
router.put('/:id', verifyToken, messageController.updateMessage);
router.delete('/:id', verifyToken, messageController.deleteMessage);

module.exports = router;