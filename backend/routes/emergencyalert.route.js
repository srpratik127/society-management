const express = require('express');
const router = express.Router();
const { createEmergencyAlert } = require('../controllers/emergencyalert.controller');

router.post('/', createEmergencyAlert);

module.exports = router;
