import prisma from "../utils/prisma.js";
import transporter from "../middleware/nodemailer.middleware.js";
import generateOTP from "../utils/otpGenerator.js";
import ENV from "../utils/ENV.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  try {
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (!existingAdmin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    if (existingAdmin.verified === false) {
      const reset_password_token = jwt.sign({ email }, ENV.JWT_SECRET, {
        expiresIn: "15m",
      });

      res.cookie("reset_password_token", reset_password_token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      return res.status(403).json({
        success: false,
        message: "Account not verified. Please change your default password.",
      });
    }

    // verify password
    const passwordVerification = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!passwordVerification) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const loginToken = jwt.sign({ email }, ENV.JWT_SECRET, { expiresIn: "6h" });

    res.cookie("login_token", loginToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 6 * 60 * 60 * 1000, // 6 hours
    });
    return res.status(200).json({
      success: true,
      message: `welcome back ${existingAdmin.fullname}`,
    });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const changePasswordOTP = async (req, res) => {
  const { existingPassword } = req.body;
  const email = req.email_reset;
  if (!existingPassword || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  const existingAdmin = await prisma.admin.findUnique({ where: { email } });

  // checking if admin exists
  if (!existingAdmin) {
    return res.status(404).json({ success: false, message: "Admin not found" });
  }
  // checking if password is the same as the current one

  if (existingAdmin.password !== existingPassword) {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect password" });
  }

  const OTP = generateOTP();
  try {
    const otpOptions = {
      from: ENV.EMAIL_OWNER,
      to: email,
      subject: "Password Change OTP",
      text: `Your OTP for password change is: ${OTP}`,
    };
    await transporter.sendMail(otpOptions);
  } catch (error) {
    console.error("Error sending OTP email:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP email",
    });
  }

  // storiting OTP and its expiry time
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
  try {
    const storeOTP = await prisma.admin.update({
      where: { email },
      data: { otp: OTP, otpExpiry: otpExpiry },
    });
    return res
      .status(200)
      .json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.error("Error at storing OTP:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const verifyOTP = async (req, res) => {
  const { otp, newPassword } = req.body;
  const email = req.email_reset;

  console.log(email);

  if (!otp) {
    return res.status(400).json({ success: false, message: "OTP is required" });
  }
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!existingAdmin) {
    return res.status(404).json({ success: false, message: "Admin not found" });
  }
  if (existingAdmin.otp !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
  // checking OTP expire date

  if (existingAdmin.otpExpiry < new Date()) {
    return res.status(400).json({ success: false, message: "OTP has expired" });
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
  // success OTP verification
  const successOptions = {
    from: ENV.EMAIL_OWNER,
    to: email,
    subject: "OTP Verified Successfully",
    text: `Your OTP has been verified successfully. Your password will be updated shortly.`,
  };

  // hash admin password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  // updating admin password
  try {
    const updatePassword = await prisma.admin.update({
      where: { email },
      data: {
        password: hashedPassword,
        verified: true,
        otp: null,
        otpExpiry: null,
      },
    });
    if (!updatePassword) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update password" });
    }
    await transporter.sendMail(successOptions);

    // clear reset_toke

    res.clearCookie("reset_password_token", {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    });

    // login token
    const loginToken = jwt.sign({ email }, ENV.JWT_SECRET, {
      expiresIn: "6h",
    });

    res.cookie("login_token", loginToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 6 * 60 * 60 * 1000, // 6 hours
    });

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = async (_, res) => {
  res.clearCookie("login_token", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
  });
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

// consistenly check admin logged in and token expiry
export const checkAdmin = async (_, res) => {
  return res.status(200).json({
    success: true,
  });
};
