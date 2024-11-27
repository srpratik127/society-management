const express = require('express');
const router = express.Router();
const controller = require('../controllers/activity.controller');

router.post("/", controller.createActivity);
router.get("/", controller.getAllActivities);
router.put("/:id", controller.updateActivity);
router.delete("/:id", controller.deleteActivity);

module.exports = router;