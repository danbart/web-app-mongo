const { Schema, model } = require('mongoose');

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    // crearedAt:
    // updatedAt
    timestamps: true
});

module.exports = model('Note', NotesSchema);