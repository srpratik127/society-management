const express = require('express');
const { getChatHistory, getAllUsers, sendMediaMessage } = require('../controllers/chat.controller');
// const upload = require('../middleware/multer.middleware');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Set the directory for storing files temporarily
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // Unique filename
  }
});

const upload = multer({ storage: storage });
module.exports = upload;


router.get('/history/:senderId/:receiverId', getChatHistory);
router.get('/getAllUsers', getAllUsers);

// New route for sending media messages
router.post('/sendMedia', upload.single('file'), sendMediaMessage);

module.exports = router;