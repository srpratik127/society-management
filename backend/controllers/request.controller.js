const Request = require("../models/request.models");
const Resident = require("../models/resident.model");
const Admin = require("../models/admin.model");

const createRequest = async (req, res) => {
  try {
    const {
      requestName,
      requesterName,
      date,
      wing,
      unit,
      priority,
      status,
      userId,
    } = req.body;

    const user =
      (await Admin.findById(userId)) || (await Resident.findById(userId));
    const userType =
      user instanceof Admin
        ? "Admin"
        : user instanceof Resident
        ? "Resident"
        : null;
    if (!userType)
      return res
        .status(404)
        .json({ success: false, message: "Admin or Resident not found" });

    const newRequest = await Request.create({
      requestName,
      requesterName,
      date,
      wing,
      unit,
      priority,
      status,
      userType,
      user: user._id,
    });
    const populatedRequest = await Request.findById(newRequest._id).populate({
      path: "user",
      select: "name profile_picture",
      model: userType,
    });
    res.status(201).json({ success: true, data: populatedRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    for (let request of requests) {
      if (request.userType === "Admin") {
        request.user = await Admin.findById(request.user).select(
          "name profile_picture"
        );
      } else if (request.userType === "Resident") {
        request.user = await Resident.findById(request.user).select(
          "name profile_picture"
        );
      }
    }
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestByUserId = async (req, res) => {
  try {
    const request = await Request.find({ user: req.params.userId })
      .populate("user", "profile_picture")
      .sort({ createdAt: -1 });
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRequest = async (req, res) => {
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (updatedRequest.userType === "Admin") {
      updatedRequest.user = await Admin.findById(updatedRequest.user).select(
        "name profile_picture"
      );
    } else if (updatedRequest.userType === "Resident") {
      updatedRequest.user = await Resident.findById(updatedRequest.user).select(
        "name profile_picture"
      );
    }

    res.status(200).json({ success: true, data: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const deletedRequest = await Request.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestByUserId,
  updateRequest,
  deleteRequest,
};
