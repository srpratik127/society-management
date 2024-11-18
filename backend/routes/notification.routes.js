const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');

router.get('/:userId', notificationController.getNotifications);
router.delete('/:userId', notificationController.clearAllNotifications);
router.delete("/clear/:userId/:notificationId", notificationController.clearSingleNotification);
module.exports = router;
