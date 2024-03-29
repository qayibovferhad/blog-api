const Blog = require("../models/blog");
const catchError = require("../utils/catchError");

const getMyBlogs = catchError(async (req, res) => {
  const { limit = 10, page = 1, q = "" } = req.query;
  const offset = (page - 1) * limit;
  const titleFilter = { $regex: ".*" + q + ".*", $options: "i" };
  const userId = req.user._id;
  const blogs = await Blog.find({ title: titleFilter })
    .select("_id title body tags likes comments createdAt")
    .populate("author", "-password")
    .sort({ createdAt: "desc" })
    .skip(offset)
    .limit(limit)
    .where("author")
    .equals(userId)
    .exec();
  const total = await Blog.find({
    title: titleFilter,
  })
    .where("author")
    .equals(userId)
    .count();
  res.status(200).send({
    list: blogs,
    total,
  });
});
const getBlogs = catchError(async (req, res) => {
  const { limit = 10, page = 1, q = "" } = req.query;
  const offset = (page - 1) * limit;
  const titleFilter = { $regex: ".*" + q + ".*", $options: "i" };
  const blogs = await Blog.find({ title: titleFilter })
    .select({
      _id: 1,
      title: 1,
      body: 1,
      tags: 1,
      likes: 1,
      comments: 1,
      createdAt: 1,
    })
    .populate("author", "-password")
    .sort({ createdAt: "desc" })
    .skip(offset)
    .limit(limit)
    .exec();
  const total = await Blog.find({
    title: titleFilter,
  }).count();
  res.status(200).send({
    list: blogs,
    total,
  });
});
const getBlogSingle = catchError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
    .select("_id title body likes createdAt tags")
    .populate("author", "_id firstname lastname username email image ")
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
const likeBlog = catchError(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.likes.includes(req.user._id)) {
    blog.likes.pull(req.user._id);
  } else {
    blog.likes.push(req.user._id);
  }
  await blog.save();
  res.status(200).send();
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
  getMyBlogs,
  likeBlog,
  newBlog,
};
