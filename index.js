const express = require("express");
const app = express();
const cors = require("cors");
const session = require('express-session')
const passport = require("passport");
const bodyParser = require('body-parser')

const mongoose = require("mongoose");
require("dotenv").config();
const usersRouter = require("./users.router");

const url = process.env.DBURL;
 
mongoose
  .connect(url)
  .then(() => {
    console.log("Mongodb server connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors());
app.use(express.json());

app.use(session({
  secret:'qweqwe',
  resave: false,
  saveUninitialized: true,
  cookie:{maxAge:60000*15}
}));
app.use(passport.initialize());
app.use(passport.session());
const { passportGoogle, ser_deser} = require('./passport.conf.js')
passportGoogle()
ser_deser()

app.use("/api/users", usersRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({ status: "fail", data: "Page Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("listening on port",process.env.PORT);
});
 