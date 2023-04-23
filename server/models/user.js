const mongoose = require("mongoose");
const crypto = require("crypto");
const SALT = process.env.PASSWORD_SALT;
const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  image: String,
});

UserSchema.pre("save", function (next) {
  this.password = crypto
    .pbkdf2Sync(this.password, SALT, 100000, 64, "sha512")
    .toString("hex");
  next();
});
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
