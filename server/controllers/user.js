const jwt = require("jsonwebtoken");
const PasswordReset = require("../models/passwordReset");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const catchError = require("../utils/catchError");
const { path } = require("../app");
const passport = require("passport");
const SALT = process.env.PASSWORD_SALT;

const registerUser = catchError(async (req, res) => {
  const { path } = req.file;
  const { firstname, lastname, username, email, password } = req.body;
  const user = new User({
    firstname,
    lastname,
    username,
    email,
    password,
    image: path,
  });
  await user.save();
  res.status(201).send("Ok!");
});
const logout = (req, res) => {
  res.clearCookie("app_access_token", { path: "/" });
  res.status(200).send();
};
const getUserInfo = (req, res) => {
  res.status(200).send(req.user);
};
const loginUser = catchError(async (req, res) => {
  passport.authenticate("local", { session: false }, (error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).send({ message: error });
      }

      const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });
      res.cookie("app_access_token", accessToken, {
        maxAge: 60 * 60 * 12 * 1000,
        httpOnly: true,
      });
      res.status(200).send("succes");
    });
  })(req, res);
});

const resetRequest = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).send({
      message: "User not found with this email address!",
    });
    return;
  }
  const resetToken = crypto.randomBytes(32).toString("base64url");
  const passwordReset = new PasswordReset({
    user: user._id,
    resetToken,
  });

  await passwordReset.save();
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const linkToPasswordResetPage =
    "http://localhost:3000/auth/reset-password/" + resetToken;

  await transporter.sendMail({
    from: "BLOGS API <noreply@blogs.info>",
    to: email,
    subject: "Password Reset",
    text: `Reset link ${linkToPasswordResetPage}`,
    html: `<h1>Password reset</h1>
    <p>Reset link: <a href=${linkToPasswordResetPage}>Reset Link</a></p>`,
  });
  res.send({
    message: "Email has been sent to you to reset your password!",
  });
};
const patchPassword = async (req, res) => {
  const { newPassword, resetToken } = req.body;
  const hashedPassword = crypto
    .pbkdf2Sync(newPassword, SALT, 100000, 64, "sha512")
    .toString("hex");
  const resetPassword = await PasswordReset.findOne({
    resetToken,
    expired: false,
  });
  if (resetPassword) {
    const userId = resetPassword.user;
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    await PasswordReset.findByIdAndUpdate(resetPassword._id, { expired: true });
    res.send({
      message: "password has been reset",
    });
  } else {
    res.send({
      message: "password reset request doest not exist",
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  patchPassword,
  resetRequest,
  getUserInfo,
  logout,
};
