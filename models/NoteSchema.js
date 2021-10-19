const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    isComplete: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

module.exports = mongoose.model('Note', NoteSchema)