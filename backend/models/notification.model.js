const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    name: { type: String },
    message: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    read: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId },
        model: {
          type: String,
          enum: ["Resident", "Admin", "Guard"],
        },
      },
    ],
    // extra
    amount: { type: String },
    otherContent: { type: Object },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
