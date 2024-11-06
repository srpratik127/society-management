const express = require('express');
const router = express.Router();
const notesController = require('../controllers/note.controller');

router.post('/', notesController.createNote);
router.get('/', notesController.getNotes);
router.get('/:id', notesController.getNoteById);
router.put('/:id', notesController.updateNote);

module.exports = router;
