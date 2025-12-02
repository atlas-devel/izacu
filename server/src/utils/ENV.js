import { config } from "dotenv";
config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_KEY_SECRET: process.env.CLOUDINARY_API_KEY_SECRET,
  EMAIL_OWNER: process.env.OWNER_EMAIL,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_OWNER_PASSWORD: process.env.OWNER_PASSWORD,
};

export default ENV;
