import { Images } from "@prisma/client";
import { config } from "../config/cloudinary";
import { v2 as cloudinary } from "cloudinary";

export default async (images: Images[]) => {
  cloudinary.config(config);

  if (images.length) {
    images.forEach((img) => {
      cloudinary.uploader.destroy(img.id);
    });
  }
};
