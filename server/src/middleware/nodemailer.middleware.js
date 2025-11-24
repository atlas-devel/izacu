import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.OWNER_EMAIL,
    pass: process.env.OWNER_PASSWORD,
  },
});

export default transporter;
