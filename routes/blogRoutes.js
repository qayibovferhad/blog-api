const Blog = require("../models/blog");
const express = require("express");
const router = express.Router();
const Session = require("../models/sessions");
router.use(async (req, res, next) => {
  const token = req.body.token || req.headers.token;
  if (token) {
    const currentSession = await Session.findOne({ accesToken: token })
      .populate("user")
      .exec();
    req.user = currentSession.user;
    next();
  } else {
    res.status(401).send({
      message: "Unauthorized request!",
    });
  }
});
router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find().populate("author").exec();
  res.status(200).send(blogs);
});
router.get("/blogs/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author").exec();
  res.status(200).send(blog);
});
router.post("/blogs", async (req, res) => {
  const blog = new Blog({
    ...req.body,
    author: req.user._id,
  });
  await blog.save();
  res.status(201).send(blog);
});
router.put("/blogs/:id", async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send("OK!");
});
router.delete("/blogs/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).send("OK!");
});

module.exports = router;
