const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    members: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resident", 
            required: true,
          },
          paymentDate: {
            type: String, 
          },
          paymentMethod: {
            type: String, 
          }
        }
      ]
});

const income = mongoose.model("income", incomeSchema);

module.exports = income
