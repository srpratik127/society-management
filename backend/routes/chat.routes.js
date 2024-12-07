const express = require("express");
const {
  handleMessage,
  getChatHistory,
  createGroup,
  getAllGroups,
  askQuestion,
  answerQuestion,
  getGroupQuestions
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
router.get("/groups", getAllGroups);
router.post("/ask-question", askQuestion); 
router.post("/answer-question", answerQuestion); 
router.get("/:groupId/questions", getGroupQuestions);

module.exports = router;
