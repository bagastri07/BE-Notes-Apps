const express = require('express')
const router = express.Router()

//Controller
const UserController = require('../controllers/UserController')

router.post('/register', UserController.create)
router.get('/', UserController.viewAll)

module.exports = router