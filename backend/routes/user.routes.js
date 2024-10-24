const express = require('express');
const router = express.Router();
const { Register } = require('../controllers/user.controllers'); 

router.post('/register', Register);

module.exports = router;
