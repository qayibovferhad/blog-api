const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const PasswordReset = require("../models/passwordReset");
const userRouter = express.Router();
const userController = require("../controllers/user");
const upload = require("../middleware/fileUpload");
const SALT = process.env.PASSWORD_SALT;
const imageUpload = upload.single("image");
userRouter.post("/register", imageUpload, [
  userController.checkEmail,
  userController.registerUser,
]);
userRouter.post("/login", userController.loginUser);
userRouter.post("/password/reset-request", userController.resetRequest);
userRouter.patch("/password", userController.patchPassword);
module.exports = userRouter;
