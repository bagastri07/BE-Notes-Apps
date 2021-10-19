const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 4000

//Cors Set uo
app.use(cors({
    origin: '*'
}))

//BodyParser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Database Connection
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, }, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Database Connected');
    }
  }
)

//
require('./passport-config/passportConfig')(passport)

//Session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 4 * 60 * 60 * 1000
    }
}))
app.use(passport.initialize())
app.use(passport.session())

//Use Route
app.use('/user', require('./routers/UserRouter'))
app.use('/note', require('./routers/NoteRouter'))

app.get('/', (req, res) => {
    res.json('Welcome to Notes API')
})

app.listen(port, () => {
    console.log('Server is running at port: ' + port)
})


