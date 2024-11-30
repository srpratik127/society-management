const express = require("express");
const {
  handleMessage,
  getChatHistory,
  createGroup,
  sendGroupMessage,
  getGroupMessages,
  getAllGroups,
  joinGroup,
} = require("../controllers/chat.controller");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/message", upload.single("file"), handleMessage);
router.get("/history/:senderId/:receiverId", getChatHistory);
router.post("/creategroup", createGroup);
router.post("/sendgroupmessage", upload.single("file"), sendGroupMessage);
router.post("/joingroup", joinGroup);
router.get("/messages/:groupId", getGroupMessages);
router.get("/groups", getAllGroups);

module.exports = router;
