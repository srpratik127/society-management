const express = require('express');
const { handleMessage, getChatHistory, getAllUsers } = require('../controllers/chat.controller');
const multer = require('multer');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
router.post('/message', upload.single('file'), handleMessage);
router.get('/history/:senderId/:receiverId', getChatHistory);

module.exports = router;