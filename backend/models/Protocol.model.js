const mongoose = require("mongoose");

const protocolSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        default: new Date().toLocaleTimeString(),
    }
});

const protocol = mongoose.model("Security-protocol", protocolSchema);

module.exports = protocol
