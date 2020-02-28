const notesCtrl = {};

const Note = require('../models/notes');

notesCtrl.renderNoteFrom = (req, res) => {
    res.render('notes/new-note');
};

notesCtrl.createNewNote = async(req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    await newNote.save();
    // aqui enviamos el mensaje al momento de redireccionar a una vista
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/notes')
};

notesCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find();
    res.render('notes/all-notes', { notes });
};

notesCtrl.renderEditFrom = async(req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', { note })
}

notesCtrl.updateNote = async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description })
        // aqui enviamos el mensaje al momento de redireccionar a una vista
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes')
};

notesCtrl.deleteNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    // aqui enviamos el mensaje al momento de redireccionar a una vista
    req.flash('success-msg', 'Note Deleted Successfully');
    res.redirect('/notes')
}

module.exports = notesCtrl;