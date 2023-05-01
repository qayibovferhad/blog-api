const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: "ObjectId",
      ref: "users",
    },
    body: String,
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comments", CommentSchema);
module.exports = CommentModel;
