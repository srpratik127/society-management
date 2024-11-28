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
        enum: ["Resident", "Admin"],
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
  choice: {
    type: String,
    enum: [
      "Multichoice polls",
      "Ranking polls",
      "Rating polls",
      "Numeric polls",
      "Text polls",
    ],
  },
  createdBy: {
    _id: { type: mongoose.Schema.Types.ObjectId },
    model: {
      type: String,
      enum: ["Resident", "Admin"],
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
