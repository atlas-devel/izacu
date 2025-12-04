import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
  RestrictComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/commments", getComments);
router.post("/comments", addComment);
router.delete("/comments/:id", deleteComment);
router.patch("/comments/restrict", RestrictComments);

export default router;
