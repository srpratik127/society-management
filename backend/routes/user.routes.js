const express = require('express');
const router = express.Router();
const { Register, Login,updateUser } = require('../controllers/user.controllers'); 

router.post('/register', Register);
router.post('/login', Login);
router.put('/update/:id',updateUser);

module.exports = router;
