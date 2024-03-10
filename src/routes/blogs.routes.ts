import express from "express";
import BlogsController from "../controllers/blogs.controller";

const router = express.Router();

const blogsController = new BlogsController();

router.get("/", blogsController.getBlogs);
router.post("/", blogsController.createBlog);
router.get("/:id", blogsController.getBlog);
router.patch("/:id", blogsController.updateBlog);

router.delete("/:id", blogsController.deleteBlog);
router.post("/:id/comments", blogsController.createComment);
router.post("/:id/likes", blogsController.likeBlog);

export default router;
