import express from "express";
import {
  changeMoviePublishStatus,
  createMovie,
  deleteMovie,
  getMovieBySlug,
  getMovies,
  getMoviesByGenre,
  getMoviesByTranslator,
  updateMovie,
  getMovieByTranslatorName,
  getMovieByGenreName,
} from "../controllers/movie.controller.js";
import parse from "../utils/cloudinary.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:slug", getMovieBySlug);
router.get("/translator/:translatorId", getMoviesByTranslator);
router.get("/genre/:genreId", getMoviesByGenre);
router.get("/translator-name/:translatorName", getMovieByTranslatorName);
router.get("/genre/:genreId", getMoviesByGenre);
router.get("/genre-name/:genreName", getMovieByGenreName);
router.post(
  "/",
  parse.fields([
    { name: "posterPotrait", maxCount: 1 },
    { name: "posterLandscape", maxCount: 1 },
  ]),
  createMovie
);
router.put("/:id", updateMovie);
router.put("/publish-status/:id", changeMoviePublishStatus);
router.delete("/:id", deleteMovie);

export default router;
