const Blog = require("../models/blog");
const express = require("express");
const router = express.Router();
const jwtsecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const blogController = require("../controllers/blog");
router.use(blogController.blogUse);
router.get("/blogs", blogController.getBlogs);
router.get("/blogs/:id", blogController.getBlogSingle);
router.post("/blogs", blogController.newBlog);
router.put("/blogs/:id", blogController.updateBlog);
router.delete("/blogs/:id", blogController.deleteBlog);

module.exports = router;
