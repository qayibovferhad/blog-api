const Blog = require("../models/blog");
const express = require("express");
const jwtsecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const getBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("author").exec();
  res.status(200).send(blogs);
};
const getBlogSingle = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author").exec();
  res.status(200).send(blog);
};
const newBlog = async (req, res) => {
  const blog = new Blog({
    ...req.body,
    author: req.user._id,
  });
  await blog.save();
  res.status(201).send(blog);
};
const updateBlog = async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send("OK!");
};
const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).send("OK!");
};

module.exports = {
  getBlogSingle,
  getBlogs,
  deleteBlog,
  updateBlog,
  newBlog,
};
