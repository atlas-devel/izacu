import express from "express";
import { ENV } from "./utils/ENV.js";
import AdminRoutes from "./routes/admin.routes.js";
import movieRoutes from "./routes/movie.route.js";
import authRoutes from "./routes/auth.route.js";
import genreRoutes from "./routes/genre.route.js";
import translatorRoutes from "./routes/translator.route.js";
import visitorsRoutes from "./routes/visitors.route.js";
import prisma from "./utils/prisma.js";

const app = express();
const PORT = ENV.PORT || 4001;

// middlewares

app.use(express.json());

app.use("/api", AdminRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/translators", translatorRoutes);
app.use("/api/visitors", visitorsRoutes);

app.get("/users", async (req, res) => {
  const users = await prisma.admin.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log("server has started on http://localhost:" + PORT);
});
