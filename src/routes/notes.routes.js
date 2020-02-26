const { Router } = require('express');
const router = Router();

const {
    renderNoteFrom,
    createNewNote,
    renderNotes,
    renderEditFrom,
    updateNote,
    deleteNote
} = require('../controllers/notes.constroller');

// New Note
router.get('/notes/add', renderNoteFrom);

router.post('/notes/add', createNewNote);

// Get Notes
router.get('/notes', renderNotes);

// Edit Notes
router.get('/notes/edit/:id', renderEditFrom);

router.put('/notes/edit/:id', updateNote);

// Delete Notes
router.delete('/notes/delete/:id', deleteNote)

module.exports = router;