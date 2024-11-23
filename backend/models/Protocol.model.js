const mongoose = require("mongoose");

const protocolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
 time: { type: String, default: Date.now, },
});

const protocol = mongoose.model("Security-protocol", protocolSchema);

module.exports = protocol;
