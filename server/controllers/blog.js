const Blog = require("../models/blog");
const catchError = require("../utils/catchError");

const getBlogs = catchError(async (req, res) => {
  const blogs = await Blog.find()
    .select("_id title body tags likes")
    .populate("author", "_id firstname lastname image")
    .exec();
  res.status(200).send(blogs);
});
const getBlogSingle = catchError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
    .select("_id title body likes")
    .populate("author", "_id firstname lastname username email image")
    .exec();
  res.status(200).send(blog);
});
const newBlog = catchError(async (req, res) => {
  const blog = new Blog({
    ...req.body,
    author: req.user._id,
  });
  await blog.save();
  res.status(201).send(blog);
});
const updateBlog = catchError(async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send("OK!");
});
const deleteBlog = catchError(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).send("OK!");
});

module.exports = {
  getBlogSingle,
  getBlogs,
  deleteBlog,
  updateBlog,
  newBlog,
};
