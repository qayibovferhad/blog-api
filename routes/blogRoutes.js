const express = require("express");
const blogRouter = express.Router();
const blogController = require("../controllers/blog");
const auth = require("../middleware/auth");

blogRouter.use(auth);
blogRouter.get("/blogs", blogController.getBlogs);
blogRouter.get("/blogs/:id", blogController.getBlogSingle);
blogRouter.post("/blogs", blogController.newBlog);
blogRouter.put("/blogs/:id", blogController.updateBlog);
blogRouter.delete("/blogs/:id", blogController.deleteBlog);

module.exports = blogRouter;
