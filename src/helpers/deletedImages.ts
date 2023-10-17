import { config } from "../config/cloudinary";
import { v2 as cloudinary } from "cloudinary";

export default async (images: [{ secure_url: string; public_id: string }]) => {
  cloudinary.config(config);

  if (images.length) {
    images.forEach((img) => {
      cloudinary.uploader.destroy(img.public_id);
    });
  }
};
