const express = require("express");
const User = require("../models/user");
const Session = require("../models/sessions");
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
  const accesToken = crypto.randomBytes(32).toString("base64");
  const session = new Session({
    user: user._id,
    accesToken,
    expiresDate: Date.now() + 1000 * 60 * 60 * 24,
  });
  await session.save();
  if (user) {
    res.send(accesToken);
  } else {
    res.status(401).send({
      message: "User is not found",
    });
  }
  console.log(user);
  res.send();
});
module.exports = router;
