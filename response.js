const STATUS = {
  success: "success",
  fail: "fail",
  error: "error",
};
const DATA = {
  requiredFields: "Email and password are required.",
  invalidCredentials: "Invalid credentials.",
  loginSuccess: "Login successful!",
  queryError: "Database query failed.",
  tokenRequired: "Token is required.",
  userNotFound: "User not found.",
  invalidID: "Invalid ID.",
  tokenValid: "Token is valid. Can log in.",
  invalidToken: "Invalid or expired token.",

  emailRequired: "Email is required.",
  sendingOTP: "OTP sended successfully",
  InvalidOTP: "Invalid OTP.",
  expiredOTP: "OTP has expired.",
  validOTP: "OTP is valid.",

  passwordsDoNotMatch: "Passwords do not match.",
  passwordPolicy:
    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.",
  passwordUpdated: "Password updated successfully.",
  wrongPassword: "Password not correct.",

  invalidEmailFormat: "Invalid email format.",
  emailInUse: "Email is already in use.",

  accountCreated: "Account created successfully.",
  tokenExpiredOrInvalid: "Token is expired or invalid.",
};
module.exports = {
  STATUS,
  DATA,
};
