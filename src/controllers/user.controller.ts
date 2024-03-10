import { Request, Response } from "express";
import userModel from "../models/user";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

class UserController {
  async registerUser(req: Request, res: Response) {
    const { name, email, age, password } = req.body;

    try {
      const user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await userModel.create({
        name,
        email,
        age,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const userExists = await userModel.findOne({ email });

      if (!userExists) {
        return res.status(400).json({ message: "User does not exist" });
      }

      const validPassword = await bcrypt.compare(password, userExists.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = generateToken(userExists);
      res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;
