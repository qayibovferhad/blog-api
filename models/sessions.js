const mongoose = require("mongoose");

const SessionSchema = mongoose.Schema({
  user: {
    type: "ObjectId",
    ref: "users",
  },
  accesToken: String,
  expires_date: Date,
  created_date: { type: Date, default: Date.now },
});

const SessionModel = mongoose.model("sessions", SessionSchema);

module.exports = SessionModel;
