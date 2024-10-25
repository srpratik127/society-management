const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  }
});

const societies = mongoose.model('societies', societySchema);

module.exports = societies;
