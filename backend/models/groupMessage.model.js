const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  groupMembers: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" }
    }
  ],
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
      message: { type: String },
      mediaUrl: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],
});

const GroupChat = mongoose.model("GroupChat", groupChatSchema);

module.exports = GroupChat;