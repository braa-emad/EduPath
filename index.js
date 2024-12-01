const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();
const usersRouter = require('./users.router');

const url = process.env.DBURL;

mongoose.connect(url).then (() => {
    console.log('Mongodb server connected');
}).catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/users',usersRouter);
app.all('*' , (req, res, next) => {
    res.status(404).json({status:"fail", data: "Page Not Found"});
})


app.listen(4000,() => {
    console.log("listening on port 4000");
});