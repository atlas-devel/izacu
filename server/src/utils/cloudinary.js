import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import ENV from "./ENV.js";
import multer from "multer";

cloudinary.config({
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_KEY_SECRET,
  cloud_name: ENV.CLOUDINARY_NAME,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: ENV.NODE_ENV === "production" ? "izacu" : "test",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 1920, quality: "auto" }],
  },
});
const parse = multer({ storage: storage });
export default parse;
