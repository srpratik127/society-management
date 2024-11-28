const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
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
    unit: {
        type: String
    }
}); 

const visitors = mongoose.model("visitor-log", visitorSchema);

module.exports = visitors;
