const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenance.controller.js");
const {roleCheck} = require("../middleware/jwt-middleware.js")

router.post("/", controller.addMaintenance);
router.get("/total-maintenance", roleCheck(["admin","resident"]), controller.getTotalAmount);
router.get("/:status", controller.getStatus);
router.get("/", controller.getAllStatus);
router.put("/:maintenanceId", controller.paymentForMaintenance);
router.get("/pending/:userId", controller.getPendingMaintenanceByUser);
router.post("/download", controller.generateInvoicePDF);
module.exports = router;
