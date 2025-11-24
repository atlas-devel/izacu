import prisma from "../utils/prisma.js";
import transporter from "../middleware/nodemailer.middleware";
import generateOTP from "../utils/otpGenerator.js";
import ENV from "../utils/ENV.js";

export const changePassword = async (req, res) => {
  const { password, email, newPassword } = req.body;
  if (!password || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }
  const emailOtions = {
    from: ENV.EMAIL_OWNER,
    to: email,
    subject: "Password Change OTP",
    text: `Your OTP for password change is: ${OTP}`,
  };
  const OTP = generateOTP();

  const existingAdmin = await prisma.admin.findUnique({ where: { email } });
  // checking if admin exists
  if (!existingAdmin) {
    return res.status(404).json({ success: false, message: "Admin not found" });
  }
  // checking if password is the same as the current one

  if (existingAdmin.password !== password) {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect password" });
  }

  // validating new password
  if (
    newPassword.length < 8 ||
    !/[A-Z]/.test(newPassword) ||
    !/[a-z]/.test(newPassword) ||
    !/[0-9]/.test(newPassword) ||
    !/[!@#$%^&*]/.test(newPassword)
  ) {
    return res.status(400).json({
      success: false,
      message:
        "New password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }
  // updating admin password
  try {
    const updatePassword = await prisma.admin.update({
      where: { email },
      data: { password: newPassword },
    });
    if (!updatePassword) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update password" });
    }
    returnres
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
