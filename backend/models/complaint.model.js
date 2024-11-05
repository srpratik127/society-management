const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    complaintName: {
      type: String,
      required: true,
    },
    complainerName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
