const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: "ObjectId",
      ref: "users",
    },
    blog: {
      type: "ObjectId",
      ref: "blogs",
    },
    body: String,
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comments", CommentSchema);
module.exports = CommentModel;
