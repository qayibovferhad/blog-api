const mongoose = require("mongoose");

const PasswordResetsSchema = mongoose.Schema(
  {
    user: {
      type: "ObjectId",
      ref: "users",
    },
    resetToken: String,
    expired: {
      type: Boolean,
      default: () => false,
    },
  },
  { timestamps: true }
);

const PasswordResetsModel = mongoose.model(
  "passwordresets",
  PasswordResetsSchema
);

module.exports = PasswordResetsModel;
