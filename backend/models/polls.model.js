const mongoose = require('mongoose');

const pollOptionSchema = new mongoose.Schema({
    optionText: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    voters: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Resident' 
    }]
});

const pollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [pollOptionSchema], 
    multipleChoice: {
        type: Boolean,  
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',  
        required: true
    },
    totalVotes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
    }
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
