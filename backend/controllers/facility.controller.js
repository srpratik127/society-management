const Facility = require("../models/facility.model");
const Notification = require("../models/notification.model");
const Resident = require("../models/resident.model");
const User = require("../models/user.model");

const createFacility = async (req, res) => {
  try {
    const { name, serviceData, description, remindBefore } = req.body;

    const savedFacility = await new Facility({
      name,
      serviceData,
      description,
      remindBefore,
    }).save();

    const users = [
      ...(await Resident.find().select("_id")).map(({ _id }) => ({
        _id,
        model: "Resident",
      })),
      ...(await User.find().select("_id")).map(({ _id }) => ({
        _id,
        model: "User",
      })),
    ];

    const newNotification = await new Notification({
      title: "New Facility Created",
      name,
      message: `A new facility "${name}" has been created. Please check the details.`,
      users,
    }).save();

    res
      .status(201)
      .json({ data: savedFacility, notification: newNotification });
  } catch (error) {
    console.error("Error during facility creation:", error);
    res.status(500).json({ message: error.message });
  }
};

const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.status(200).json(facilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    res.status(200).json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFacility = async (req, res) => {
  try {
    const { name, serviceData, description, remindBefore } = req.body;

    const updatedFacility = await Facility.findByIdAndUpdate(
      req.params.id,
      { name, serviceData, description, remindBefore },
      { new: true }
    );
    if (!updatedFacility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    res.status(200).json(updatedFacility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFacility,
  getFacilities,
  getFacilityById,
  updateFacility,
};
