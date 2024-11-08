const mongoose = require("mongoose");

const maintenance = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      required: true,
    },
    amount: {
      type: Number,
    },
    penaltyAmount: {
      type: Number,
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    penaltyDay: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "done"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["online", "cash"],
      default: "cash",
    },
  },
  { timestamps: true }
);

const maintenances = mongoose.model("maintenance", maintenance);

module.exports = maintenances;
