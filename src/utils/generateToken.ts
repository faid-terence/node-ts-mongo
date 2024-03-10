import jwt from "jsonwebtoken";
import { IUser } from "../models/user";

export const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "30d",
    }
  );
};
