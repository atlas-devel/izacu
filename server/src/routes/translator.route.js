import express from "express";
import {
  createTranslator,
  deleteTranslator,
  getTranslators,
  updateTranslator,
} from "../controllers/translator.controller.js";

const router = express.Router();

router.get("/", getTranslators);
router.post("/", createTranslator);
router.put("/:id", updateTranslator);
router.delete("/:id", deleteTranslator);

export default router;
