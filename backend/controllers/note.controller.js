const Note = require('../models/note.model');

const createNote = async (req, res) => {
    try {
        const { title, date, description, userId, societyId } = req.body;
        const newNote = new Note({
            title,
            date,
            description,
            userId,
            societyId,
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const { societyId, userId } = req.query; 
        const filter = {};
        if (societyId) filter.societyId = societyId;
        if (userId) filter.userId = userId;
        const notes = await Note.find(filter).populate('userId societyId');
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).populate('userId societyId');
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const { title, date, description } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, date, description },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={
 createNote,
 getNotes,
 getNoteById,
 updateNote,
}