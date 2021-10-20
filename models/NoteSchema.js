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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

module.exports = mongoose.model('Note', NoteSchema)