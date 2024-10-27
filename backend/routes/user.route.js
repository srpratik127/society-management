const express = require('express');
const router = express.Router();
const { Register, Login,updateUser, getUserProfile } = require('../controllers/user.controller'); 
const verifyToken = require('../middleware/jwt-middleware');

router.post('/register', Register);
router.post('/login', Login);
router.get('/get', verifyToken, getUserProfile);
router.put('/update/:id',updateUser);

module.exports = router;
