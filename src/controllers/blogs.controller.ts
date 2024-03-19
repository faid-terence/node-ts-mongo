import { Request, Response } from "express";
import blogModel, { IBlog } from "../models/blogs";
import commentModel, { IComment } from "../models/comments";

class BlogsController {
  async createBlog(req: Request, res: Response) {
    const { title, content } = req.body;

    try {
      const blog = await blogModel.findOne({ title });
      if (blog) {
        return res.status(400).json({ message: "Blog already exists" });
      }

      const newBlog = new blogModel({ title, content });
      await newBlog.save();

      res.status(201).json(newBlog);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getBlogs(req: Request, res: Response) {
    try {
      const blogs = await blogModel.find();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getBlog(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const blog = await blogModel.findById(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json(blog);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateBlog(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const blog = await blogModel.findById(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      if (title) {
        blog.title = title;
      }

      if (content) {
        blog.content = content;
      }

      await blog.save();
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteBlog(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const blog = await blogModel.findByIdAndDelete(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async likeBlog(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const blog = await blogModel.findById(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      blog.likes += 1;
      await blog.save();
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteComment(req: Request, res: Response) {
    const { blogId, commentId } = req.params;

    try {
      const blog: IBlog | null = await blogModel.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      const commentIndex: number = blog.comments.findIndex(
        (comment) => comment._id === commentId
      );
      if (commentIndex === -1) {
        return res.status(404).json({ message: "Comment not found" });
      }
      blog.comments.splice(commentIndex, 1);
      await blog.save();

      return res
        .status(200)
        .json({ message: "Comment deleted successfully", blog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async createComment(req: Request, res: Response) {
    const { blogId } = req.params;
    const { content, author } = req.body;

    try {
      const blog: IBlog | null = await blogModel.findById(blogId);
      if (!blog) {
        console.log(`Blog with ID ${blogId} not found`);
        return res.status(404).json({ message: "Blog not found" });
      }

      const newComment: IComment = new commentModel({
        content,
        author,
      });

      await newComment.save();

      blog.comments = newComment._id;

      // Save the updated blog
      await blog.save();

      console.log("Updated blog:", blog);

      return res
        .status(201)
        .json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default BlogsController;
