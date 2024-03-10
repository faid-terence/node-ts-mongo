import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  age: number;
  password: string;
  isAdmin?: boolean;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const userModel = mongoose.model<IUser>("User", userSchema);

export default userModel;
