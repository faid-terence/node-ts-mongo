import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/connectDB";
import blogsRoutes from "./routes/blogs.routes";
import authRoutes from "./routes/user.routes";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Knights!");
});

app.use("/api/blogs", blogsRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening at http://localhost:${port}`);
});
