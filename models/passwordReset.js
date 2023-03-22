const mongoose = require("mongoose");

const PasswordResetsSchema = mongoose.Schema({
  user: {
    type: "ObjectId",
    ref: "users",
  },
  resetToken: String,
  expired: {
    type: Boolean,
    default: () => false,
  },
  created_date: { type: Date, default: Date.now },
});

const PasswordResetsModel = mongoose.model(
  "passwordresets",
  PasswordResetsSchema
);

module.exports = PasswordResetsModel;
