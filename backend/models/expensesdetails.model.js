const mongoose = require("mongoose");

const expenseDetailsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    bill: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExpenseDetails = mongoose.model("ExpenseDetails", expenseDetailsSchema);

module.exports = ExpenseDetails;
