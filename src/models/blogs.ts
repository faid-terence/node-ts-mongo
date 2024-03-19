import mongoose, { Schema } from "mongoose";
import { IComment, commentSchema } from "./comments";

export interface IBlog extends mongoose.Document {
  title: string;
  content: string;
  likes: number;
  comments: IComment[];
}

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Schema.Types.ObjectId, ref: "Comment" },
});

const blogModel = mongoose.model<IBlog>("Blog", blogSchema);

export default blogModel;
