import express from "express";
import {
  changePasswordOTP,
  checkAdmin,
  login,
  logout,
  verifyOTP,
} from "../controllers/auth.controller.js";
import { isAuthenticatedAdmin } from "../middleware/adminAuthentication.js";
import { password_reset_tokenAuth } from "../middleware/password_reset.js";

const AuthRouter = express.Router();

AuthRouter.post("/admin/login", login);
AuthRouter.post("/otp-generate", password_reset_tokenAuth, changePasswordOTP);
AuthRouter.post("/verify-otp", password_reset_tokenAuth, verifyOTP);
AuthRouter.post("/admin/logout", logout);

// authenticate admin
AuthRouter.get("/check-auth", isAuthenticatedAdmin, checkAdmin);

export default AuthRouter;
