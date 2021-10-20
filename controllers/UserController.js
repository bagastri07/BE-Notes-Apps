const User = require('../models/UserModel')
const Note = require('../models/NoteSchema')
const bcrypt = require('bcrypt')
const response = require('../_helpers/response')
const passport = require('passport')

const UserControllers = {
    create: (req, res) => {
        User.findOne({username: req.body.username}, async (err, doc) => {
            if (err) return response(res, 500, false, err)
            if (doc) return response(res, 400, false, 'Username has been taken')

            var userData = req.body
            userData.password = await bcrypt.hash(userData.password, 5)

            const newUser = new User(userData)

            //Validate
            let error = await newUser.validateSync()
            if (error) return response(res, 400, false, error)

            const saveUser = await newUser.save();
            return response(res, 200, true, 'User has been created', saveUser)
        })
    },
    viewAll: (req, res) => {
        User.find((err, doc) => {
            if (err) return response(res, 500, false, err)
            return response(res, 200, true, 'Data ready', doc)
        })
        console.log(req.user)
    },
    view: (req, res) => {
        User.findOne({username: req.user.username}, (err, doc) => {
            if (err) return response(res, 500, false, err)
            return response(res, 200, true, 'Data ready', doc)
        })
    },
    delete: (req, res) => {
        User.findOneAndRemove({username: req.user.username}, (err, user) => {
            if (err) return response(res, 500, false, err)
            if (!user)return response(res, 400, true, 'Account not found')
            //delete all note of this user
            Note.deleteMany({user: user._id}, (err, note) => {
                if (err) return response(res, 500, false, err)
                //Logut user
                req.logout()
                data = {
                    user: user,
                    note: note
                }
                return response(res, 200, true, 'Account Deleted & Account has been logout', data)
                })
        })
    },
    login: (req, res, next) => {
        passport.authenticate('local', function(err, user, info) {
            if (err) return response(res, 500, false, err)
            if (!user) response(res, 500, false, 'No User found')
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              return response(res, 200, true, 'Succes Login', user);
            });
          })(req, res, next);
    },
    logout: (req, res) => {
        if(!req.user) return response(res, 400, false, 'You need to login to logout')
        let username = req.user.username
        req.logout()
        return response(res, 200, true, 'You are logout successfully', {username: username})
    }
}

module.exports = UserControllers
