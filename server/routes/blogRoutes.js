const express = require("express");
const authMiddleware = require("../middleware/auth");
const blogRouter = express.Router();
const blogController = require("../controllers/blog");

blogRouter.use(authMiddleware);
blogRouter.get("/blogs", blogController.getBlogs);
blogRouter.get("/blogs/:id", blogController.getBlogSingle);
blogRouter.post("/blogs", blogController.newBlog);
blogRouter.put("/blogs/:id", blogController.updateBlog);
blogRouter.delete("/blogs/:id", blogController.deleteBlog);

module.exports = blogRouter;