const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const response = require('../_helpers/response')

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
    }
}

module.exports = UserControllers
