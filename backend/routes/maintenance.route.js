const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenance.controller.js");

router.post("/", controller.addMaintenance);
router.get("/:status", controller.getStatus);
router.get("/", controller.getAllStatus);

module.exports = router;
