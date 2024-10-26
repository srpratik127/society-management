const express = require('express');
const router = express.Router();
const controller = require('../controllers/forgetPass.controller'); 

router.post('/otpmail',controller.otpmail)
router.post('/verify',controller.verifyOTP)
router.post('/resetPassword',controller.resetPassword)

module.exports = router;
