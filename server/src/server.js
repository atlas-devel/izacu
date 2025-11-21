import express from "express";
import { ENV } from "./utils/ENV.js";
import AdminRoutes from "./routes/admin.routes.js";

const app = express();

// middlewares

app.use(express.json());
app.use("/api", AdminRoutes);

const PORT = ENV.PORT || 4001;

app.listen(PORT, () => {
  console.log("server has started on http://localhost:" + PORT);
});
