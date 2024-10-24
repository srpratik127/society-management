
const express = require('express');
const router = express.Router();
const { Register } = require('../controllers/user.controllers.js'); 

if (!Register) {
    throw new Error("Register function is undefined!");
}


router.post('/register', Register); 

module.exports = router; 
