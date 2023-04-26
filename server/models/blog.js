const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema(
  {
    title: String,
    author: {
      type: "ObjectId",
      ref: "users",
    },
    body: String,
    likes: Number,
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("blogs", BlogSchema);
module.exports = BlogModel;
