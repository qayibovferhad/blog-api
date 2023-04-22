const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
  title: String,
  author: {
    type: "ObjectId",
    ref: "users",
  },
  body: String,
  comments: [{ body: String, date: Date }],
  date_created: { type: Date, default: Date.now },
});

const BlogModel = mongoose.model("blogs", BlogSchema);
module.exports = BlogModel;
