const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users',userRouter)

app.set('view engine', 'ejs');

const PORT = 5000
app.listen(PORT,()=>{
    console.log('Server Listening on PORT ',PORT)
})
