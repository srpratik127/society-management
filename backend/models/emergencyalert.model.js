const mongoose = require('mongoose');

const emergencyAlertSchema = new mongoose.Schema({
  alertType: {
    type: String,
    enum: ['Emergency', 'Warning', 'Fire Alarm', 'Earth Quack', 'High Winds', 'Thunder'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    enum: 'Guard', 
    required: true
  },
  notifiedResidents: [{
    type: mongoose.Schema.Types.ObjectId,
    enum: 'Resident, Admin'
  }]
}, { timestamps: true });

const emergencyalert = mongoose.model('emergencyalert', emergencyAlertSchema);

module.exports = emergencyalert;