const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: false,  
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'societies', 
    },
}, {
    timestamps: true, 
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
