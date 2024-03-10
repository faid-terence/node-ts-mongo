import mongoose from "mongoose";
import { commentSchema } from "./comments";

export interface IBlog extends mongoose.Document {
  title: string;
  content: string;
  comments: Array<{
    content: string;
    author: string;
  }>;
  likes: number;
}

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [commentSchema],
  likes: { type: Number, default: 0 },
});

const blogModel = mongoose.model<IBlog>("Blog", blogSchema);

export default blogModel;
