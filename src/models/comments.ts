import mongoose from "mongoose";

export interface IComment extends mongoose.Document {
  content: string;
  author: string;
}

export const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: {
    type: String,
    required: true,
  },
});

const commentModel = mongoose.model<IComment>("Comment", commentSchema);

export default commentModel;
