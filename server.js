const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Database Connection
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, }, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Database Connected');
    };
  }
);

//Use Route
app.use('/user', require('./routers/UserRouter'))

app.get('/', (req, res) => {
    res.json('Welcome to Notes API')
})

app.listen(port, () => {
    console.log('Server is running at port: ' + port)
})


