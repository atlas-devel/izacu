import jwt from "jsonwebtoken";
import ENV from "../utils/ENV.js";
import prisma from "../utils/prisma.js";

export const isAuthenticatedAdmin = async (req, res, next) => {
  const { login_token } = req.cookies;
  if (!login_token) {
    console.error("Unauthorized: At authentication middleware");
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const { email } = jwt.verify(login_token, ENV.JWT_SECRET);
    if (!email) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.email = email;
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (!existingAdmin) {
      return res.status(401).json({ success: false, message: "Unauthorized " });
    }

    next();
  } catch (error) {
    console.error(
      "Unauthorized: At authentication middleware",
      error.message || error
    );
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
