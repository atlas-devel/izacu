import jwt from "jsonwebtoken";
import ENV from "../utils/ENV.js";

export const tokenAuth = async (req, res, next) => {
  const { change_password_token } = req.cookies;
  if (!change_password_token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }
  const decodedEmail = await jwt.verify(change_password_token, ENV.JWT_SECRET);
  if (!decodedEmail) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
  req.email = decodedEmail.email;
  next();
};
