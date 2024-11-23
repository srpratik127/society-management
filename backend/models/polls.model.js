const mongoose = require("mongoose");

const pollOptionSchema = new mongoose.Schema({
  optionText: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  voters: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId },
      model: {
        type: String,
        enum: ["Resident", "User"],
      },
    },
  ],
});

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [pollOptionSchema],
  multipleChoice: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    _id: { type: mongoose.Schema.Types.ObjectId },
    model: {
      type: String,
      enum: ["Resident", "User"],
    },
  },

  totalVotes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
