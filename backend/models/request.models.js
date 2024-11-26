const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    requestName: {
      type: String,
      required: true,
    },
    requesterName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    wing: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Open", "Solve"],
      required: true,
      default: "Pending",
    },
    userType: {
      type: String,
      enum: ["Admin", "Resident"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "userType",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
