import jwt from "jsonwebtoken";
import ENV from "../utils/ENV.js";

export const password_reset_tokenAuth = async (req, res, next) => {
  const { reset_password_token } = req.cookies;
  if (!reset_password_token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }
  const { email } = jwt.verify(reset_password_token, ENV.JWT_SECRET);
  if (!email) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
  req.email_reset = email;
  next();
};
