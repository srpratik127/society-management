const EmergencyAlert = require('../models/emergencyalert.model');
const Resident = require('../models/resident.model'); 
const Admin = require('../models/admin.model'); 
const Guard = require('../models/guard.model'); 
const Notification = require('../models/notification.model'); 

const createEmergencyAlert = async (req, res) => {
  try {
    const { alertType, description, createdBy } = req.body;
    const residents = await Resident.find().select('_id');
    const admins = await Admin.find().select('_id');
    const notifiedResidents = [...residents, ...admins].map(({ _id }) => _id);
    const guard = await Guard.findById(createdBy);
    if (!guard) {
      return res.status(400).json({ message: 'Invalid Guard ID' });
    }
    const emergencyAlert = new EmergencyAlert({
      alertType,
      description,
      createdBy,
      notifiedResidents
    });
    await emergencyAlert.save();
    const notificationUsers = [
      ...notifiedResidents.map((id) => ({ _id: id, model: 'Resident' })),
      ...admins.map((id) => ({ _id: id, model: 'Admin' }))
    ];
    const newNotification = new Notification({
      title: 'Security Alert',
      name:'Emergency Alert',
      message: `New Alert: ${alertType}. ${description}`,
      users: notificationUsers
    });
    await newNotification.save();
    res.status(200).json({
      message: 'Emergency alert created and notifications sent successfully.',
      alert: emergencyAlert,
      notification: newNotification
    });
  } catch (error) {
    console.error('Error creating emergency alert:', error);
    res.status(500).json({
      message: 'Failed to create emergency alert',
      error: error.message
    });
  }
};


module.exports = {
  createEmergencyAlert,
};
