const express = require('express');
const app= express();

const dotenv = require("dotenv");
const mongoose = require('mongoose');
require('./db/conn');
const User = require('./model/userSchema');

//app.use(express.body-parser);   //convert json data into object
app.use(express.urlencoded());

dotenv.config({ path: './config.env'});
const port = process.env.port;

app.use(require('./router/auth'));


app.get('/', (req,res) => {
    res.send('Hello world');
});

// app.get('/about', (req,res) => {
//     res.send('Hello world about');
// });

app.get('/contact', (req,res) => {
    res.cookie("test" , "shristi");   ///name and value
    res.send('Hello world contact');
});

app.get('/signin', (req,res) => {
    res.send('Hello world signin');
});

app.get('/signup', (req,res) => {
    res.send('Hello world signup ');
});

app.listen(5000, () => {
    console.log('server running on port 5000');
})

console.log('subscribe to my channel ');
