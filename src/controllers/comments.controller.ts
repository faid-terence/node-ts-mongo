import commentModel from "../models/comments";
import { Request, Response } from "express";

class CommentContrroller {
  async getComments(req: Request, res: Response) {
    try {
      const comments = await commentModel.find();
      return res.status(200).json(comments);
    } catch (error) {}
  }
}




export default CommentContrroller;