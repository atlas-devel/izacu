import express from "express";
import {
  changePasswordOTP,
  verifyOTP,
} from "../controllers/auth.controller.js";
import { tokenAuth } from "../middleware/tokenAuth.js";

const AuthRouter = express.Router();

AuthRouter.post("/otp-generate", changePasswordOTP);
AuthRouter.post("/verify-otp", tokenAuth, verifyOTP);

export default AuthRouter;
