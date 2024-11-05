const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Activity", activitySchema);
