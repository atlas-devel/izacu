import express from "express";
import { createMovie } from "../controllers/admin.js";

const AdminRoutes = express.Router();

AdminRoutes.post("/admin/create-movie/:adminId", createMovie);

export default AdminRoutes;
