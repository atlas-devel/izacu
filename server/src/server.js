import express from "express";
import { ENV } from "./utils/ENV.js";
import AdminRoutes from "./routes/admin.routes.js";
import movieRoutes from "./routes/movie.route.js";
import AuthRouter from "./routes/auth.route.js";
import genreRoutes from "./routes/genre.route.js";
import translatorRoutes from "./routes/translator.route.js";
import visitorsRoutes from "./routes/visitors.route.js";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api", AdminRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/auth", AuthRouter);
app.use("/api/genres", genreRoutes);
app.use("/api/translators", translatorRoutes);
app.use("/api/visitors", visitorsRoutes);

const PORT = ENV.PORT || 4001;

app.listen(PORT, () => {
  console.log("server has started on http://localhost:" + PORT);
});
