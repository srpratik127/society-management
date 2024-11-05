const Maintenance = require('../models/maintenance.model');
const User = require('../models/user.model');

const addMaintenance = async (req, res) => {
    try {
      const { amount, penaltyAmount, dueDate, penaltyDay } = req.body;
  
      const users = await User.find();
  
      const maintenanceRecords = users.map((user) => ({
        user: user._id,
        amount,
        penaltyAmount,
        dueDate,
        penaltyDay,
        status: 'pending',
      }));
  
      await Maintenance.insertMany(maintenanceRecords);
  
      res.status(200).json({ message: 'Maintenance records created for all users' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating maintenance records', error: error.message });
    }
  };

  const getStatus = async (req, res) => {
    try {
        const status = req.params.status;
        if (status === 'pending' || status === 'done') {
            const response = await Maintenance.find({ status })
                .populate('user', 'firstname lastname profile_picture')
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
            .populate('user', 'firstname lastname profile_picture')
            .exec();
        res.status(200).json(allMaintenance);
    } catch (error) {
        console.log("Get all maintenance error:", error);
        res.status(500).json({ message: 'Error fetching all maintenance data', error: error.message });
    }
};

module.exports = {
    addMaintenance,
    getStatus,
    getAllStatus
}