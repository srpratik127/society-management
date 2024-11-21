const Message = require("../models/Message");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

exports.handleMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const file = req.file;
  try {
    let mediaUrl = null;

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
      });
      mediaUrl = result.secure_url;
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Failed to delete local file:", err);
        } else {
          console.log("Local file deleted successfully:", file.path);
        }
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message: message || null,
      mediaUrl,
    });
    const savedMessage = await newMessage.save();

    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to handle the message" });
  }
};

exports.getChatHistory = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve chat history" });
  }
};

// exports.saveMessage = async (senderId, receiverId, message, mediaUrl = null) => {
//   const newMessage = new Chat({ senderId, receiverId, message, mediaUrl });
//   return await newMessage.save();
// };

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await Resident.find({}, 'fullName profile_picture');
//     if (!users || users.length === 0) {
//       return res.status(404).json({ message: "No users found." });
//     }
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.sendMediaMessage = async (req, res) => {
//   const { senderId, receiverId } = req.body;
//   const file = req.file;

//   try {
//     const result = await cloudinary.uploader.upload(file.path, {
//       resource_type: "auto"
//     });

//     const mediaMessage = await exports.saveMessage(senderId, receiverId, null, result.secure_url);

//     res.status(200).json(mediaMessage);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to send media message" });
//   }
// };
