const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    time: {
        type: String,
        default: () => new Date().toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
    }
});

const announcement = mongoose.model("announcement", announcementSchema);

module.exports = announcement;
