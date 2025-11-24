import express from "express";
import { createMovie } from "../controllers/admin.js";
import parse from "../utils/cloudinary.js";

const AdminRoutes = express.Router();

AdminRoutes.post(
  "/admin/create-movie/:adminId",
  parse.array("image"),
  createMovie
);

export default AdminRoutes;
