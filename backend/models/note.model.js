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
    }
}, {
    timestamps: true, 
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
