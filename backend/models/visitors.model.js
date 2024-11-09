const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    time: {
        type: String,
        default: new Date().toLocaleTimeString(),
    },
    wing: {
        type: String
    },
    unit_Number: {
        type: String
    }
}); 

const visitors = mongoose.model("visitor-log", visitorSchema);

module.exports = visitors;
