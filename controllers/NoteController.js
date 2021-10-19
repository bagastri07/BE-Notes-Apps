const Note = require('../models/NoteSchema')
const User = require('../models/UserModel')
const response = require('../_helpers/response')

const NoteController = {
    create: (req, res) => {
        //Split data
        const noteData = req.body
        noteData.tags = noteData.tags.split(',')

        //make data to mongodb
        Note.create(req.body, (err, noteDoc) => {
            if (err) response(res, 500, false, err)
            User.findOneAndUpdate({username: req.user.username}, {
                $push: {
                    notes: noteDoc._id
                }
            }, {new: true}, (err, userDoc) => {
                if (err) response(res, 500, false, err)
                const userInfo = {
                    _id: userDoc._id,
                    username: userDoc.username,
                    notes: userDoc.notes
                }
                return response(res, 200, true, 'Note added', {note: noteDoc, user: userInfo})
            })
        })
    },
    view: (req, res) => {
        User.findOne({username: req.user.username})
            .populate('notes')
            .then((doc) => {
                const userInfo = {
                    _id: doc._id,
                    username: doc.username,
                    notes: doc.notes
                }
                return response(res, 200, true, 'Get Notes Succes', userInfo)
            })
            .catch((err) => {
                return response(res, 500, false, err)
            })
    }
}

module.exports = NoteController