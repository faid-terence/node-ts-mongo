import request from "supertest";
import mongoose from "mongoose";
import app from "../src/index"; // Assuming your Express app is exported from '../app'
import blogModel from "../src/models/blogs";
import commentModel from "../src/models/comments";
import { IComment } from "../src/models/comments";
import userModel from "../src/models/user";

const blogId = new mongoose.Types.ObjectId();
const userId = new mongoose.Types.ObjectId();
const commentId = new mongoose.Types.ObjectId();

describe("BlogsController", () => {
  beforeAll(async () => {
    await blogModel.create({
      _id: blogId,
      title: "Test Blog",
      content: "This is a test blog",
      likes: 0,
    });

    await commentModel.create({
      _id: commentId,
      content: "Test Comment",
      author: "Test Author",
    });

    await userModel.create({
      _id: userId,
      name: "Test User",
      email: "faidtere1@gmail.com",
      password: "password",
      age: 25,
    });
  });

  afterAll(async () => {
    await blogModel.deleteMany();
    await commentModel.deleteMany();
    await userModel.deleteMany();
    await mongoose.disconnect();
  });

  describe("GET /api/blogs", () => {
    it("should return all blogs", async () => {
      const res = await request(app).get("/api/blogs");
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/blogs/:id", () => {
    it("should return a specific blog", async () => {
      const res = await request(app).get(`/api/blogs/${blogId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("title", "Test Blog");
    });

    it("should return 404 if blog not found", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/blogs/${nonExistentId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Blog not found");
    });
  });

  describe("POST /api/blogs", () => {
    it("should create a new blog", async () => {
      const newBlog = {
        title: "New Test Blog",
        content: "This is a new test blog",
      };
      const res = await request(app).post("/api/blogs").send(newBlog);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("title", newBlog.title);
      expect(res.body).toHaveProperty("content", newBlog.content);
    });

    it("should return 400 if blog already exists", async () => {
      const existingBlog = {
        title: "Test Blog",
        content: "This is a new test blog",
      };
      const res = await request(app).post("/api/blogs").send(existingBlog);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Blog already exists");
    });
  });

  describe("PATCH /api/blogs/:id", () => {
    it("should update an existing blog", async () => {
      const updatedBlog = {
        title: "Updated Test Blog",
        content: "This is an updated test blog",
      };
      const res = await request(app)
        .patch(`/api/blogs/${blogId}`)
        .send(updatedBlog);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("title", updatedBlog.title);
      expect(res.body).toHaveProperty("content", updatedBlog.content);
    });

    it("should return 404 if blog not found", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const updatedBlog = {
        title: "Updated Test Blog",
        content: "This is an updated test blog",
      };
      const res = await request(app)
        .patch(`/api/blogs/${nonExistentId}`)
        .send(updatedBlog);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Blog not found");
    });
  });

  describe("DELETE /api/blogs/:id", () => {
    it("should delete an existing blog", async () => {
      const res = await request(app).delete(`/api/blogs/${blogId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Blog deleted successfully");
    });

    it("should return 404 if blog not found", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/blogs/${nonExistentId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Blog not found");
    });
  });

  describe("DELETE /api/blogs/:blogId/comments/:commentId", () => {
    it("should return 404 if blog not found", async () => {
      const nonExistentBlogId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(
        `/api/blogs/${nonExistentBlogId}/comments/${commentId}`
      );
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Blog not found");
    });

    it("should return 404 if comment not found", async () => {
      const nonExistentCommentId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(
        `/api/blogs/${blogId}/comments/${nonExistentCommentId}`
      );
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Blog not found");
    });
  });

  describe("POST /api/auth", () => {
    it("should create a new user", async () => {
      const newUser = {
        name: "New Test User",
        email: "newtestuser@example.com",
        age: 25,
        password: "password",
      };
      const res = await request(app).post("/api/auth/register").send(newUser); // Use app instead of server
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("name", newUser.name);
      expect(res.body).toHaveProperty("email", newUser.email);
      expect(res.body).toHaveProperty("age", newUser.age);
      // Optionally check isAdmin if required
      // expect(res.body).toHaveProperty("isAdmin", false);
    });
  });
});
