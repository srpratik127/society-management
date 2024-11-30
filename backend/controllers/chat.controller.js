const Message = require("../models/Message");
const cloudinary = require("../utils/cloudinary");
const GroupChat = require("../models/groupMessage.model");
const Resident = require("../models/resident.model");
const User = require("../models/admin.model");
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
    res.status(500).json({ message: "Failed to handle the message" });
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
    res.status(500).json({ message: "Failed to retrieve chat history" });
  }
};
// for group
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await GroupChat.find({});

    if (!groups || groups.length === 0) {
      return res.status(404).json({ message: "No groups found." });
    }
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error retrieving groups:", error);
    res.status(500).json({ message: "Failed to retrieve groups" });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { groupName } = req.body;
    const allResidents = await Resident.find({});
    const residentsMembers = allResidents.map((resident) => ({
      _id: resident._id,
    }));

    const allMembers = [...residentsMembers];

    const newGroupChat = new GroupChat({
      groupName,
      groupMembers: allMembers,
      messages: [],
    });

    await newGroupChat.save();

    res.status(201).json({
      message: "Group chat created successfully",
      group: newGroupChat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create group chat" });
  }
};

exports.sendGroupMessage = async (req, res) => {
  const { groupId, senderId, message } = req.body;
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

    const groupChat = await GroupChat.findById(groupId);
    if (!groupChat) {
      return res.status(404).json({ error: "Group not found" });
    }

    const newMessage = { senderId, message, mediaUrl, createdAt: new Date() };
    groupChat.messages.push(newMessage);
    await groupChat.save();

    const populatedMessage = await GroupChat.findOne(
      { _id: groupId },
      { messages: { $slice: -1 } }
    ).populate({
      path: "messages.senderId",
      select: "fullName profile_picture",
    });

    res.status(200).json({ message: populatedMessage.messages[0] });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message" });
  }
};

exports.getGroupMessages = async (req, res) => {
  const { groupId } = req.params;
  try {
    const groupChat = await GroupChat.findById(groupId).populate({
      path: "messages.senderId",
      select: "fullName profile_picture",
    });

    if (!groupChat) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.status(200).json(groupChat.messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve messages" });
  }
};

exports.joinGroup = async (req, res) => {
  const { groupId, userId } = req.body;

  try {
    const group = await GroupChat.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const isMember = group.groupMembers.some((member) => member._id.toString() === userId);
    if (isMember) {
      return res.status(400).json({ message: "User is already a member of the group" });
    }

    group.groupMembers.push({ _id: userId });
    await group.save();

    res.status(200).json({ message: "Successfully joined the group", group });
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({ message: "Failed to join group" });
  }
};
