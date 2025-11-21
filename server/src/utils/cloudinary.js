import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { ENV } from "./ENV.js";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_KEY_SECRET,
});

export default cloudinary;

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: ENV.NODE_ENV === "development" ? "dev_test" : "izacu_prod",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
