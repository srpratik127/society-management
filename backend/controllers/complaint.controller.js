const Complaint = require("../models/complaint.model.js");
const Resident = require("../models/resident.model.js");
const Admin = require("../models/admin.model.js");

const createComplaint = async (req, res) => {
  try {
    const { complaintName, complainerName, description, wing, unit, priority, userId } = req.body;

    const user = await Admin.findById(userId) || await Resident.findById(userId);
    const userType = user instanceof Admin ? "Admin" : user instanceof Resident ? "Resident" : null;

    if (!userType) return res.status(404).json({ success: false, message: "Admin or Resident not found" });

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

    const populatedComplaint = await Complaint.findById(newComplaint._id).populate({
      path: 'user',
      select: 'name profile_picture',
      model: userType,
    });

    res.status(201).json({ success: true, data: populatedComplaint });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    for (let complaint of complaints) {
      if (complaint.userType === "Admin") {
        complaint.user = await Admin.findById(complaint.user).select(
          "name profile_picture"
        );
      } else if (complaint.userType === "Resident") {
        complaint.user = await Resident.findById(complaint.user).select(
          "name profile_picture"
        );
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

const getComplaintsByUserId = async (req, res) => {
  try {
   const userId = req.params.userId;

    const complaints = await Complaint.find({ user: userId })
      .populate("user", "profile_picture").sort({ createdAt: -1 });

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

    if (complaint.userType === "Admin") {
      complaint.user = await User.findById(complaint.user).select(
        "name profile_picture"
      );
    } else if (complaint.userType === "Resident") {
      complaint.user = await Resident.findById(complaint.user).select(
        "name profile_picture"
      );
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
  getComplaintsByUserId,
  updateComplaint,
  deleteComplaint,
};
