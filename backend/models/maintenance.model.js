const mongoose = require("mongoose");

const maintenance = new mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    penaltyAmount: {
      type: Number,
      default: 0,
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    penaltyDay: {
      type: Date,
    },
    member: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Resident",
          required: true,
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
    ],
  },
  { timestamps: true }
);

const maintenances = mongoose.model("maintenance", maintenance);

module.exports = maintenances;
