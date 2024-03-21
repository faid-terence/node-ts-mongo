import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/connectDB";
import blogsRoutes from "./routes/blogs.routes";
import authRoutes from "./routes/user.routes";
import commentsRoutes from "./routes/comments.routes";

const app = express();
const port = 8000 || process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Knights!");
});

app.use("/api/blogs", blogsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentsRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
