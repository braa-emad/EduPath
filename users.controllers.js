const User = require("./user.model");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const RESPONSE = require("./response");

const saltrounds = 10;
const SECRET_KEY = process.env.SECRET_KEY;

const isStrongPassword = (password) =>
  validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

const createJWT = (userinfo) => {
  const payload = {
    id: userinfo._id,
    username: userinfo.username,
    email: userinfo.email,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  return token;
};
const createTempJWT = (userinfo) => {
  const Temptoken = jwt.sign({ email: userinfo.email }, SECRET_KEY, {
    expiresIn: "15m",
  });
  return Temptoken;
};

const Getallusers = async (req, res) => {
  const users = await User.find({}, { __v: false });
  res.json({ status: RESPONSE.STATUS.success, data: { users } });
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: RESPONSE.STATUS.fail,
      data: RESPONSE.DATA.requiredFields,
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: RESPONSE.STATUS.fail,
        data: RESPONSE.DATA.invalidCredentials,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: RESPONSE.STATUS.fail,
        data: RESPONSE.DATA.invalidCredentials,
      });
    }
    const token = createJWT(user);
    res
      .status(200)
      .json({
        status: RESPONSE.STATUS.success,
        data: RESPONSE.DATA.loginSuccess,
        token,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ status: RESPONSE.STATUS.error, data: RESPONSE.DATA.queryError });
  }
};

const Register = async (req, res) => {
  const { username, email, password } = req.body;

  const isexist = (check, fieldName) => {
    if (!check || check.trim() === "") {
      res.status(400).json({
        status: RESPONSE.STATUS.fail,
        data: { field: fieldName, error: "is required" },
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
      status: RESPONSE.STATUS.fail,
      data: RESPONSE.DATA.invalidEmailFormat,
    });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      status: RESPONSE.STATUS.fail,
      data: RESPONSE.DATA.passwordPolicy,
    });
  }

  try {
    const found = await User.findOne({ email });
    if (found) {
      return res.status(409).json({
        status: RESPONSE.STATUS.fail,
        data: RESPONSE.DATA.emailInUse,
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltrounds);

    const NewUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await NewUser.save();
    const token = await createJWT(NewUser);
    return res.status(201).json({
      status: RESPONSE.STATUS.success,
      data: RESPONSE.DATA.accountCreated,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      status: RESPONSE.STATUS.error,
      data: err.message,
    });
  }
};

const Profile = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(400)
      .json({
        status: RESPONSE.STATUS.fail,
        data: RESPONSE.DATA.tokenRequired,
      });
  }
  try {
    const user = jwt.verify(token, SECRET_KEY);
    if (!user) {
      return res
        .status(404)
        .json({
          status: RESPONSE.STATUS.fail,
          data: RESPONSE.DATA.userNotFound,
        });
    }
    return res.json({
      status: RESPONSE.STATUS.success,
      data: { username: user.username },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: RESPONSE.STATUS.error, data: err.message });
  }
};

const LoginWithToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(400)
      .json({
        status: RESPONSE.STATUS.fail,
        data: RESPONSE.DATA.tokenRequired,
      });
  }
  try {
    const user = jwt.verify(token, SECRET_KEY);
    if (!user) {
      return res.json({
        status: RESPONSE.STATUS.fail,
        data: RESPONSE.DATA.invalidID,
      });
    }
    return res
      .status(200)
      .json({
        status: RESPONSE.STATUS.success,
        data: RESPONSE.DATA.tokenValid,
        username: user.username,
      });
  } catch (err) {
    return res
      .status(401)
      .json({
        status: RESPONSE.STATUS.error,
        data: RESPONSE.DATA.invalidToken,
      });
  }
};

const reqOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({
        status: RESPONSE.STATUS.fail,
        data: RESPONSE.DATA.emailRequired,
      });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({
          status: RESPONSE.STATUS.fail,
          data: RESPONSE.DATA.userNotFound,
        });
    }
    const token = createTempJWT(user);
    const otp = await generateOTP(user);
    const message = "Forgot Password OTP";
    sendOTP(email, otp, message);
    res
      .status(200)
      .json({
        status: RESPONSE.STATUS.success,
        data: RESPONSE.DATA.sendingOTP,
        temptoken: token,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ status: RESPONSE.STATUS.error, data: err.message });
  }
};

const userForgotPassword = async (req, res) => {
  const { newPassword, ConfirmPassword, token } = req.body;
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.id = decoded.id;
    const user = await User.findById(req.id);
    if (newPassword !== ConfirmPassword) {
      return res
        .status(400)
        .json({
          status: RESPONSE.STATUS.fail,
          data: RESPONSE.DATA.passwordsDoNotMatch,
        });
    }
    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({
        status: RESPONSE.STATUS.fail,
        data: RESPONSE.DATA.passwordPolicy,
      });
    }

    const password = await bcrypt.hash(newPassword, saltrounds);

    user.password = password;
    await user.save();
    return res
      .status(200)
      .json({
        status: RESPONSE.STATUS.success,
        data: RESPONSE.DATA.passwordUpdated,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ status: RESPONSE.STATUS.error, data: err.message });
  }
};

const userResetPassword = async (req, res) => {
  const { OldPassword, newPassword, ConfirmPassword, token } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.id = decoded.id;
    const user = await User.findById(req.id);
    if (!user) {
      return res
        .status(404)
        .json({
          status: RESPONSE.STATUS.fail,
          data: RESPONSE.DATA.invalidToken,
        });
    }
    const isMatch = await bcrypt.compare(OldPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({
          status: RESPONSE.STATUS.fail,
          data: RESPONSE.DATA.wrongPassword,
        });
    }
    if (newPassword !== ConfirmPassword) {
      return res
        .status(400)
        .json({
          status: RESPONSE.STATUS.fail,
          data: RESPONSE.DATA.passwordsDoNotMatch,
        });
    }
    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({
        status: RESPONSE.STATUS.fail,
        data: RESPONSE.DATA.passwordPolicy,
      });
    }
    const password = await bcrypt.hash(newPassword, saltrounds);
    user.password = password;
    await user.save();
    return res
      .status(200)
      .json({
        status: RESPONSE.STATUS.success,
        data: RESPONSE.DATA.passwordUpdated,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ status: RESPONSE.STATUS.error, data: err.message });
  }
};

const generateOTP = async (user) => {
  const OTPNum = Math.floor(1000 + Math.random() * 9000);
  const expirationTime = new Date().getTime() + 2 * 60 * 1000;
  const OTP = OTPNum.toString();
  try {
    user.otp = OTP;
    user.otpExpiration = expirationTime;
    await user.save();
    console.log(user);
    return OTP;
  } catch (err) {
    return { status: RESPONSE.STATUS.error, data: err.message };
  }
};

const Checktoken = async (req, res) => {
  const { OTP, token } = req.body;
  try {
    if (!OTP) {
      return res
        .status(400)
        .json({ status: RESPONSE.STATUS.fail, data: RESPONSE.DATA.InvalidOTP });
    }
    if (!token) {
      return res
        .status(400)
        .json({
          status: RESPONSE.STATUS.fail,
          data: RESPONSE.DATA.invalidToken,
        });
    }
    const decoded = await jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res
        .status(404)
        .json({
          status: RESPONSE.STATUS.fail,
          data: RESPONSE.DATA.userNotFound,
        });
    }
    if (user.otp != OTP) {
      return res
        .status(400)
        .json({ status: RESPONSE.STATUS.fail, data: RESPONSE.DATA.InvalidOTP });
    }
    if (new Date().getTime() > user.otpExpiration) {
      user.otp = null;
      await user.save();
      return res
        .status(400)
        .json({ status: RESPONSE.STATUS.fail, data: RESPONSE.DATA.InvalidOTP });
    }
    user.otp = null;
    await user.save();
    return res
      .status(200)
      .json({ status: RESPONSE.STATUS.success, data: RESPONSE.DATA.validOTP });
  } catch (err) {
    return res
      .status(500)
      .json({ status: RESPONSE.STATUS.error, data: err.message });
  }
};

const sendOTP = (email, otp, message) => {
  const mailoptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: message,
    text: `OTP for Reset Your Password ${otp}`,
  };
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  transporter.sendMail(mailoptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
  });
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
  Checktoken,
};
