const notesCtrl = {};

const Note = require('../models/notes');

notesCtrl.renderNoteFrom = (req, res) => {
    res.render('notes/new-note');
};

notesCtrl.createNewNote = async(req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    // aqui enviamos el mensaje al momento de redireccionar a una vista
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/notes')
};

notesCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: 'desc' });
    res.render('notes/all-notes', { notes });
};

notesCtrl.renderEditFrom = async(req, res) => {
    const note = await Note.findById(req.params.id);
    if (note.user != req.user.id) {
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes')
    }
    res.render('notes/edit-note', { note })
}

notesCtrl.updateNote = async(req, res) => {
    if (note.user != req.user.id) {
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes')
    }
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description })
        // aqui enviamos el mensaje al momento de redireccionar a una vista
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes')
};

notesCtrl.deleteNote = async(req, res) => {
    if (note.user != req.user.id) {
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes')
    }
    await Note.findByIdAndDelete(req.params.id);
    // aqui enviamos el mensaje al momento de redireccionar a una vista
    req.flash('success-msg', 'Note Deleted Successfully');
    res.redirect('/notes')
}

module.exports = notesCtrl;