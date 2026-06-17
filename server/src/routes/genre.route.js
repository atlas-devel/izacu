import express from "express";
import {
  createGenre,
  deleteGenre,
  getGenres,
  updateGenre,
  addMovieGenre,
} from "../controllers/genre.controller.js";

const router = express.Router();

router.get("/", getGenres);
router.post("/", createGenre);
router.post("/movie", addMovieGenre);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);

export default router;
