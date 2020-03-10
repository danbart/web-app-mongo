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

const { isAuthenticated } = require('../helpers/auth')

// New Note
router.get('/notes/add', isAuthenticated, renderNoteFrom);

router.post('/notes/add', isAuthenticated, createNewNote);

// Get Notes
router.get('/notes', isAuthenticated, renderNotes);

// Edit Notes
router.get('/notes/edit/:id', isAuthenticated, renderEditFrom);

router.put('/notes/edit/:id', isAuthenticated, updateNote);

// Delete Notes
router.delete('/notes/delete/:id', isAuthenticated, deleteNote)

module.exports = router;