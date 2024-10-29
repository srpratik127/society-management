const mongoose = require('mongoose');

const maintenance = new mongoose.Schema({
  anount: {
    type: Number
  },
  penaltyAmount: {
    type: Number
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  penaltyDay: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'done'],
    default: 'pending'
  }
});

const maintenances = mongoose.model('maintenance', maintenance);

module.exports = maintenances;
