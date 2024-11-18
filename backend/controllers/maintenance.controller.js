const Maintenance = require('../models/maintenance.model');
const Resident = require('../models/resident.model');
const Notification = require('../models/notification.model');

const addMaintenance = async (req, res) => {
  try {
    const { amount, penaltyAmount, dueDate, penaltyDay } = req.body;
    const users = await Resident.find();
    const maintenanceRecords = users.map((user) => ({
      user: user._id,
      amount,
      penaltyAmount,
      dueDate,
      penaltyDay,
      status: 'pending',
    }));
    const data = await Maintenance.insertMany(maintenanceRecords);
    const populatedData = await Maintenance.find({ _id: { $in: data.map((d) => d._id) } })
      .populate('user', 'fullName profile_picture wing unit phone role')
      .exec();
      
    for (let record of populatedData) {
      const notification = new Notification({
        title: "New Maintenance Record Created",
        message: `A new maintenance record of ${record.amount} has been created. Due Date: ${record.dueDate}`,
        user: record.user._id, 
      });
      await notification.save();
    }
    res.status(200).json({ data: populatedData, message: "Maintenance records created for all users" });
  } catch (error) {
    res.status(500).json({ message: "Error creating maintenance records", error: error.message });
  }
};

  const getStatus = async (req, res) => {
    try {
        const status = req.params.status;
        if (status === 'pending' || status === 'done') {
            const response = await Maintenance.find({ status })
                .populate('user', 'fullName profile_picture wing unit phone role')
                .exec();
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: 'Invalid status value' });
            console.log("Invalid status value");
        }
    } catch (error) {
        console.log("Get status controller error:", error);
        res.status(500).json({ message: 'Error fetching status data', error: error.message });
    }
};

const getAllStatus = async (req, res) => {
    try {
        const allMaintenance = await Maintenance.find()
            .populate('user', 'fullName profile_picture wing unit phone role')
            .exec();
        res.status(200).json(allMaintenance);
    } catch (error) {
        console.log("Get all maintenance error:", error);
        res.status(500).json({ message: 'Error fetching all maintenance data', error: error.message });
    }
};

const applyPenalties = async () => {
  try {
    const today = new Date();
    const maintenanceRecords = await Maintenance.find({
      penaltyDay: { $lte: today },
      status: 'pending',
      penaltyAmount: { $gt: 0 },
    });

    const updatePromises = maintenanceRecords.map((record) => {
      return Maintenance.findByIdAndUpdate(record._id, {
        $inc: { amount: record.penaltyAmount },
      });
    });

    await Promise.all(updatePromises);
    console.log("Penalties applied to overdue maintenance records.");

  } catch (error) {
    console.error("Error applying penalties:", error);
  }
};

module.exports = {
    addMaintenance,
    getStatus,
    getAllStatus,
    applyPenalties
}