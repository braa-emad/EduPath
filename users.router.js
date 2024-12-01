const controller = require('./users.controllers')
const express = require('express');
const router = express.Router();
const {verifyToken} = require('./users.controllers');
const passport = require('passport');


router.route('/')
    .get(controller.Getallusers);

router.route('/register')
    .post(controller.Register);


router.route('/login')
    .post(controller.Login);

router.route('/profile')
    .post(controller.Profile);

router.route('/loginwithtoken')
    .post(controller.LoginWithToken);


router.route('/resetpassword')
    .post(controller.userResetPassword);
    
router.route('/forgotpassword')
    .post(controller.userForgotPassword);

router.route('/otp')
    .post(controller.reqOTP);

router.route('/checktoken')
    .post(controller.Checktoken);

module.exports = router
