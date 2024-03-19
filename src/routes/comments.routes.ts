import express from "express";
import CommentContrroller from "../controllers/comments.controller";

const commentsController = new CommentContrroller();
const router = express.Router();
router.get("/", commentsController.getComments);

export default router;
