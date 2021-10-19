const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const titleCase = require('../_helpers/titleCase')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    picUrl: {
        type: String,
        default: null
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
})

UserSchema.pre('save', function (next) {
    // capitalize
    this.name = titleCase(this.name)
    this.city = titleCase(this.city)
    next()
  })

module.exports = mongoose.model('User', UserSchema)