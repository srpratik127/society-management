const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  members: [
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
      paymentDate: {
        type: String,
        default: new Date().toISOString().split("T")[0],
      },
      paymentMethod: {
        type: String,
      },
      payAmount: {
        type: String,
      },
    },
  ],
});

const income = mongoose.model("income", incomeSchema);

module.exports = income;
