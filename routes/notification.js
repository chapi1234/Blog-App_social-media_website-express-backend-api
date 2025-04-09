const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');

router.post('/', notificationController.createNotification);
router.get('/', notificationController.getAllNotifications);
router.patch('/read/:id', notificationController.markNotificationAsRead);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;