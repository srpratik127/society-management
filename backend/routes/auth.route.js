const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Register, Login,updateUser, checkPassword, verifyPassword } = require('../controllers/auth.controller'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
const upload = multer({ dest: 'uploads/' });

router.post('/register', Register);
router.post('/login', Login);
router.put('/update/:id',upload.single('profile_picture'),updateUser);
router.post('/verify-password', verifyPassword);
module.exports = router;
