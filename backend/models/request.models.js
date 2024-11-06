const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requestName: {
        type: String,
        required: true,
    },
    requesterName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    wing: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        required: true,
        default: 'Pending', 
    }
}, {
    timestamps: true 
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
