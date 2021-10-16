const express = require('express')
const router = express.Router()
const isAuthenticated = require('../midlewares/isAuthenticated')

//Controller
const UserController = require('../controllers/UserController')

router.post('/register', UserController.create)
router.get('/',isAuthenticated ,UserController.view)
router.get('/all',isAuthenticated ,UserController.viewAll)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

module.exports = router