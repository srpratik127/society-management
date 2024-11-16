const Chat = require('../models/Message');
const Resident = require('../models/resident.model');
const cloudinary = require('../utils/cloudinary');

exports.getChatHistory = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve chat history" });
  }
};

exports.saveMessage = async (senderId, receiverId, message, mediaUrl = null) => {
  const newMessage = new Chat({ senderId, receiverId, message, mediaUrl });
  return await newMessage.save();
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Resident.find({}, 'fullName profile_picture');
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// New controller for sending media messages
exports.sendMediaMessage = async (req, res) => {
  const { senderId, receiverId } = req.body;
  const file = req.file;

  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto"
    });

    // Save media message
    const mediaMessage = await exports.saveMessage(senderId, receiverId, null, result.secure_url);

    res.status(200).json(mediaMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to send media message" });
  }
};