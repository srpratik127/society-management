const mongoose = require("mongoose");

const guardSchema = new mongoose.Schema({
    profile_photo: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phoneNomber: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    shift: {
        type: String,
        enum: ['Day', 'Night']
    },
    shiftDate: {
        type: Date,
    },
    shiftTime: {
        type: String
    },
    aadhar_card: {
        type: String
    }
});

const Guard = mongoose.model("Security-guard", guardSchema);

module.exports = Guard
