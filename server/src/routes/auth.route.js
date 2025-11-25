import express from "express";
import {
  changePasswordOTP,
  checkAdmin,
  login,
  logout,
  verifyOTP,
} from "../controllers/auth.controller.js";
import { tokenAuth } from "../middleware/tokenAuth.js";
import { isAuthenticatedAdmin } from "../middleware/adminAuthentication.js";

const AuthRouter = express.Router();

AuthRouter.post("/otp-generate", changePasswordOTP);
AuthRouter.post("/verify-otp", tokenAuth, verifyOTP);
AuthRouter.post("/admin/login", login);
AuthRouter.post("/admin/logout", logout);

// authenticate admin
AuthRouter.get("/check-auth", isAuthenticatedAdmin, checkAdmin);

export default AuthRouter;
