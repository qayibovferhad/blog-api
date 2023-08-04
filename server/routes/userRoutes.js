const express = require("express");

const userRouter = express.Router();
const userController = require("../controllers/user");
const upload = require("../middleware/fileUpload");
const passport = require("passport");
const imageUpload = upload.single("image");

userRouter.post("/register", imageUpload, userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/password/reset-request", userController.resetRequest);
userRouter.patch("/password", userController.patchPassword);
userRouter.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  userController.getUsers
);

userRouter.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  userController.getUserInfo
);
userRouter.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  userController.logout
);
module.exports = userRouter;
