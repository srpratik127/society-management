const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenance.controller.js");

router.post("/", controller.addMaintenance);
router.get("/total-maintenance", controller.getTotalAmount);
router.get("/:status", controller.getStatus);
router.get("/", controller.getAllStatus);
router.put("/:maintenanceId", controller.paymentForMaintenance);
router.get("/pending/:userId", controller.getPendingMaintenanceByUser);
module.exports = router;
