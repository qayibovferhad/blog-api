const express = require("express");
const authMiddleware = require("../middleware/auth");
const blogRouter = express.Router();
const blogController = require("../controllers/blog");
const passport = require("passport");

blogRouter.use(passport.authenticate("jwt", { session: false }));
blogRouter.get("/blogs", blogController.getBlogs);
blogRouter.get("/blogs/my", blogController.getMyBlogs);
blogRouter.get("/blogs/:id", blogController.getBlogSingle);
blogRouter.put("/blogs/:id/like", blogController.likeBlog);
blogRouter.post("/blogs", blogController.newBlog);
blogRouter.put("/blogs/:id", blogController.updateBlog);
blogRouter.delete("/blogs/:id", blogController.deleteBlog);

module.exports = blogRouter;
