const express = require('express')
const router = express.Router()
const isAuthenticated = require('../midlewares/isAuthenticated')

//Controller
const NoteController = require('../controllers/NoteController')

router.post('/', isAuthenticated, NoteController.create)
router.get('/', isAuthenticated, NoteController.view)
router.delete('/:id', isAuthenticated, NoteController.delete)

module.exports = router