const jwt = require("jsonwebtoken");
const User = require("../models/user");
const PasswordReset = require("../models/passwordReset");
const crypto = require("crypto");
const SALT = process.env.PASSWORD_SALT;

const registerUser = async (req, res) => {
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
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = crypto
    .pbkdf2Sync(password, SALT, 100000, 64, "sha512")
    .toString("hex");
  const user = await User.findOne({ email, password: hashedPassword });
  if (user) {
    const { password: _, ...rest } = user.toObject();
    const accesToken = jwt.sign(
      {
        data: rest,
        exp: Date.now() / 1000 + 60 * 60,
      },
      process.env.JWT_SECRET
    );
    res.send(accesToken);
  } else {
    res.status(401).send({
      message: "User is not found",
    });
  }
  res.send();
};
const resetRequest = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const passwordReset = new PasswordReset({
    user: user._id,
    resetToken: crypto.randomBytes(32).toString("base64url"),
  });
  await passwordReset.save();
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
};
