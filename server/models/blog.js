const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    likes: Number,
    author: {
      type: "ObjectId",
      ref: "users",
    },
    tags: {
      type: [String],
      default: () => [],
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("blogs", BlogSchema);
module.exports = BlogModel;
