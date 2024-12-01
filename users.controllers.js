const User = require('./user.model');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const saltrounds = 10;
const SECRET_KEY = process.env.SECRET_KEY;

const isStrongPassword = (password) =>
    validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,}
);

const createJWT = (userinfo) => {
    const payload = {
        id: userinfo._id,
        username: userinfo.username,
        email : userinfo.email
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
    return token;
};
const createTempJWT = (userinfo) => {
    
    const Temptoken = jwt.sign({email: userinfo.email}, SECRET_KEY, {expiresIn: '15m'});
    return Temptoken;
}

const Getallusers = async (req, res) => {
    const users = await User.find({}, {"__v": false});
    res.json({status: 'success', data: {users}});
};

const Login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: "fail",
            data: "Email and password are required."
        });
    }

    try {
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({status: "fail", data: "Invalid credentials."});
    }
    const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
    return res.status(400).json({status:"fail", data: "Invalid credentials." });
}
    const token = createJWT(user);
res.status(200).json({status: "success", data: "Login successful!", token});
    } catch (err){
        return res.status(500).json({ status: "error", data: "Database query failed." });
    }
};

const Register = async (req, res) => { 
    const { username, email, password } = req.body;

    
    const isexist = (check, fieldName) => {
        if (!check || check.trim() === "") {
            res.status(400).json({
                status: "fail",
                data: { field: fieldName, error: "is required" }
            });
            return false;
        }
        return true;
    };

    
    if (!isexist(username, "username")) return;
    if (!isexist(email, "email")) return;
    if (!isexist(password, "password")) return;

    
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            status: "fail",
            data: "Invalid email format."
        });
    }

    
    if (!isStrongPassword(password)) {
        return res.status(400).json({
            status: "fail",
            data: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol."
        });
    }

    try {
        const found = await User.findOne({ email });
        if (found) {
            return res.status(409).json({
                status: "fail",
                data: "Email is already in use."
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, saltrounds);

        
        const NewUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await NewUser.save();
        const token = await createJWT(NewUser);
        return res.status(201).json({
            status: "success",
            data: "Account created successfully.",
            token
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            data: err.message
        });
    }
};


const Profile = async (req, res) => {
    const {token} = req.body;
    if(!token) {
        return res.status(400).json({status: "fail", data:"token is required"});
    }
    try {
        const user = jwt.verify(token, SECRET_KEY);
        if (!user) {
            return res.status(404).json({status: "fail", data: "User not found."});
        }
        return res.json({status: "success", data: {username: user.username}});
    } catch (err) {
        return res.status(500).json({status: "error", data: err.message});
    }
};

const LoginWithToken = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({status: "fail", data: "No token provided."});
    }
    try {
        const user = jwt.verify(token, SECRET_KEY);
        if (!user) {
            return res.json({status: "fail", data: "Invalid ID."});
        }
        return res.status(200).json({status: "success", data: "Token is valid. can log in.", username: user.username});
    } catch (err) {
        return res.status(401).json({status: "error", data: "Invalid or expired token."});
    }
};

const reqOTP = async (req, res) => {
    const {email} = req.body;
    if(!email){
        return res.status(400).json({status: "fail", data:'Email is required'});
    }
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({status: "fail", data: 'If the email is associated with an account, we will send an OTP to that email address'});
        }
    const token = createTempJWT(user);
    const otp = await generateOTP(user);
    const message = 'Forgot Password OTP';
    sendOTP(email, otp, message);
    console.log(otp);
    res.status(200).json({status: "success", data:'OTP sended successfully', temptoken:token});
    
    }catch (err) {
        return res.status(500).json({status:'error', data:err.message});
    }
}

const userForgotPassword = async (req, res) => {
    const {newPassword, ConfirmPassword, token} = req.body;
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.id = decoded.id;
        const user = await User.findById(req.id);
    if(newPassword !== ConfirmPassword){
        return res.status(400).json({status: "fail", data: 'Passwords do not match'});
    }
    if (!isStrongPassword(newPassword)){
    return res.status(400).json({
        status: "fail",
        data: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol."
    });
}

const password = await bcrypt.hash(newPassword, saltrounds);

user.password = password;
await user.save();
return res.status(200).json({ status: "success", data: "Password updated successfully." });
}
 catch(err){
    return res.status(500).json({ status: "error", data:err.message });
 }    
}

const userResetPassword = async (req, res) => {
    const {OldPassword, newPassword, ConfirmPassword, token} = req.body;
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.id = decoded.id;
        const user = await User.findById(req.id);
        if (!user) {
            return res.status(404).json({status: "fail", data: "Token is expired Or Invalid "}); //redirect to Login page
        }
        const isMatch = await bcrypt.compare(OldPassword, user.password);
        if(!isMatch){
            return res.status(401).json({status: "fail", data:'Password not correct'});   
        }
        if(newPassword !== ConfirmPassword){
            return res.status(400).json({status: "fail", data: 'Passwords do not match'});
        }
        if (!isStrongPassword(newPassword)){
        return res.status(400).json({
            status: "fail",
            data: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol."
        });
    }
    const password = await bcrypt.hash(newPassword, saltrounds);
    user.password = password;
    await user.save();
    return res.status(200).json({ status: "success", data: "Password updated successfully." });

    } catch (err) {
        return res.status(500).json({status: "error", data: err.message});
    }


}

const generateOTP = async (user) => {
        const OTPNum = Math.floor(1000 + Math.random() * 9000);
        const expirationTime = new Date().getTime() + 2 * 60 * 1000;
        const OTP = OTPNum.toString();
        try {
            user.otp = OTP;
            user.otpExpiration = expirationTime;
            await user.save();
            console.log(user);
            return  OTP ;
        } catch (err) {
            return { status: "error", data: err.message };
}
};

const Checktoken = async (req, res) => {
    const {OTP, token} = req.body;
    try {
    if(!OTP){
        return res.status(400).json({ status: 'fail', data:'Invalid OTP' });
    }
    if(!token){
        return res.status(400).json({ status: 'fail', data:'INVALID TOKEN' });
    }
    const decoded = await jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({email:decoded.email});
    if (!user) {
        return res.status(401).json({status: 'fail', data: "User not found"});
    }
    if ( user.otp != OTP) {
        return res.status(401).json({ status: "fail", data: "Invalid OTP" });
    }
    if (new Date().getTime() > user.otpExpiration) {
        user.otp = null;
        await user.save();
        return res.status(401).json({ status: "fail", data: "OTP has expired" });
    }
    user.otp = null;
    await user.save();
    return res.status(200).json({ status: "success", data: "OTP is valid" });
} catch(err){
    return res.status(500).json({status: 'error', data: err.message});
}
} 

const sendOTP = (email, otp, message) => {
    const mailoptions = {
        from : process.env.EMAIL_USER,
        to : email,
        subject : message,
        text : `your OTP for verification ${otp}`
    }
    const transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth:{
            user : process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false,
        }
    });
    transporter.sendMail(mailoptions,(err,info) =>{
        if(err){
            console.log("error Occurred",err);
        }else{

            console.log('OTP Email Sent Successfully:', info.response)
        }
    })
};

module.exports = {
    Getallusers,
    Login,
    Register,
    Profile,
    LoginWithToken,
    userForgotPassword,
    userResetPassword,
    reqOTP,
    Checktoken
};