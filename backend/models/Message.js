const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
  message: { type: String },
  mediaUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
