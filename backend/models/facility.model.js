const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    serviceData: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false, 
    },
    remindBefore: {
        type: Number, 
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true 
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
