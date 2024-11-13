const Complaint = require("../models/complaint.model.js");
const Resident = require("../models/resident.model.js");
const User = require("../models/user.model.js");


const createComplaint = async (req, res) => {
  try {
    const { complaintName, complainerName, description, wing, unit, priority, userId } = req.body;

    let user = await User.findById(userId);
    let userType = 'User'; 

    if (!user) {
      user = await Resident.findById(userId);
      userType = 'Resident';
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User or Resident not found",
      });
    }

    const newComplaint = await Complaint.create({
      complaintName,
      complainerName,
      description,
      wing,
      unit,
      priority,
      userType,
      user: user._id,
    });

    res.status(201).json({
      success: true,
      data: newComplaint,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    for (let complaint of complaints) {
      if (complaint.userType === 'User') {
        complaint.user = await User.findById(complaint.user).select('name profile_picture');
      } else if (complaint.userType === 'Resident') {
        complaint.user = await Resident.findById(complaint.user).select('name profile_picture');
      }
    }

    res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('userId', 'firstname lastname profile_picture');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }
    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
};
