const notesCtrl = {};

const Note = require('../models/notes');

notesCtrl.renderNoteFrom = (req, res) => {
    res.render('notes/new-note');
};

notesCtrl.createNewNote = async(req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    await newNote.save();
    res.redirect('/notes')
};

notesCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find();
    res.render('notes/all-notes', { notes });
};

notesCtrl.renderEditFrom = (req, res) => {
    res.send('Render edit From')
}

notesCtrl.updateNote = (req, res) => {
    res.send('Update Note')
};

notesCtrl.deleteNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes')
}

module.exports = notesCtrl;