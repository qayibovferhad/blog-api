const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const PasswordReset = require("../models/passwordReset");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const SALT = process.env.PASSWORD_SALT;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const filePartName = file.originalname.split(".");
    const exc = filePartName[filePartName.length - 1];
    const uniqiue = Date.now() + "-" + Math.random(Math.random() * 10000);
    cb(null, uniqiue + "." + exc);
  },
});
const upload = multer({ storage });

router.post("/register", upload.single("image"), async (req, res) => {
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
router.post("/login", async (req, res) => {
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
});
router.post("/password/reset-request", async (req, res) => {
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
});
router.patch("/password", async (req, res) => {
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
});
module.exports = router;
