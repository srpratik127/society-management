const Maintenance = require("../models/maintenance.model");
const Resident = require("../models/resident.model");
const Notification = require("../models/notification.model");
const User = require("../models/user.model");

const addMaintenance = async (req, res) => {
  try {
    const { amount, penaltyAmount, dueDate, penaltyDay } = req.body;

    const users = await Resident.find();
    const memberRecords = users.map((user) => ({
      user: user._id,
      status: "pending",
      paymentMethod: "cash",
    }));

    const maintenance = new Maintenance({
      amount,
      penaltyAmount,
      dueDate,
      penaltyDay,
      member: memberRecords,
    });

    const savedMaintenance = await maintenance.save();

    const populatedMaintenance = await Maintenance.findById(
      savedMaintenance._id
    )
      .populate("member.user", "fullName profile_picture wing unit phone role")
      .exec();

    // for notification
    const notificationUsers = [
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
      title: "New Maintenance Created",
      name: "Annual Maintenance",
      message: `Per Person Amount : ₹${amount} and dueDate is: ${dueDate}`,
      users: notificationUsers,
    }).save();

    res.status(200).json({
      data: populatedMaintenance, notification: newNotification,
      message: "Maintenance record created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating maintenance record",
      error: error.message,
    });
  }
};

const getStatus = async (req, res) => {
  try {
    const { status } = req.params;

    if (status === "pending" || status === "done") {
      const response = await Maintenance.find({ "member.status": status })
        .populate({
          path: "member.user",
          select: "fullName profile_picture wing unit phone role",
        })
        .exec();

      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Invalid status value" });
      console.log("Invalid status value");
    }
  } catch (error) {
    console.log("Get status controller error:", error);
    res
      .status(500)
      .json({ message: "Error fetching status data", error: error.message });
  }
};

const getAllStatus = async (req, res) => {
  try {
    const allMaintenance = await Maintenance.find()
      .populate({
        path: "member.user",
        select: "fullName profile_picture wing unit phone role",
      })
      .exec();

    res.status(200).json(allMaintenance);
  } catch (error) {
    console.log("Get all maintenance error:", error);
    res.status(500).json({
      message: "Error fetching all maintenance data",
      error: error.message,
    });
  }
};

const getPendingMaintenanceByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const maintenanceRecords = await Maintenance.find({
      "member.user": userId,
      "member.status": "pending",
    });

    const filteredRecords = maintenanceRecords.map(record => {
      const member = record.member.find(m => m.user.toString() === userId && m.status === "pending");
      return member ? { ...record.toObject(), member: [member] } : null;
    }).filter(Boolean);

    // if (!filteredRecords.length) {
    //   return res.status(404).json({ message: 'No pending maintenance records found for this user' });
    // }

    res.status(200).json(filteredRecords);
  } catch (error) {
    console.error("Error fetching pending maintenance for user:", error);
    res.status(500).json({ message: 'Error fetching pending maintenance records', error: error.message });
  }
};

const applyPenalties = async () => {
  // try {
  //   const today = new Date();
  //   const maintenanceRecords = await Maintenance.find({
  //     "member.status": "pending",
  //     penaltyDay: { $lte: today },
  //   });

  //   const updatePromises = maintenanceRecords.map(async (record) => {
  //     const updatedMembers = record.member.map((member) => {
  //       if (member.status === "pending") {
  //         record.amount += record.penaltyAmount;
  //         return {
  //           ...member,
  //           // amount: record.amount + record.penaltyAmount,
  //         };
  //       }
  //       return member;
  //     });

  //     return Maintenance.findByIdAndUpdate(
  //       record._id,
  //       { $set: { amount: record.amount, member: updatedMembers } },
  //       { new: true }
  //     );
  //   });

  //   await Promise.all(updatePromises);
  //   console.log("Penalties applied to overdue maintenance records.");
  // } catch (error) {
  //   console.error("Error applying penalties:", error);
  // }
};

module.exports = {
  addMaintenance,
  getStatus,
  getAllStatus,
  getPendingMaintenanceByUser,
  applyPenalties,
};
