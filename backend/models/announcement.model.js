const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Event", "Activity"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Resident",
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now(),
    },
    time: {
      type: String,
      default: () =>
        new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
    },
  },
  { timestamps: true }
);

const announcement = mongoose.model("announcement", announcementSchema);

module.exports = announcement;
