const Blog = require("../models/blog");
const express = require("express");
const blogRouter = express.Router();
const jwtsecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const blogController = require("../controllers/blog");
blogRouter.use(auth);
blogRouter.get("/blogs", blogController.getBlogs);
blogRouter.get("/blogs/:id", blogController.getBlogSingle);
blogRouter.post("/blogs", blogController.newBlog);
blogRouter.put("/blogs/:id", blogController.updateBlog);
blogRouter.delete("/blogs/:id", blogController.deleteBlog);

module.exports = blogRouter;
