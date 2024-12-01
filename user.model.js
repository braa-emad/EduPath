const mongoose = require('mongoose');
const validator = require('validator');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: false
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    otp:{
        type: String,
    },
    otpExpiration:{
        type: Date 
    }
    
});

module.exports = mongoose.model('User', UserSchema);