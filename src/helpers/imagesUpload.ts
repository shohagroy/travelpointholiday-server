import { Images } from "@prisma/client";
import { config } from "../config/cloudinary";

import { v2 as cloudinary } from "cloudinary";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";

export default async (blobImages: string[]) => {
  cloudinary.config(config);

  const files = blobImages;
  try {
    const uploadedFiles = await Promise.all(
      files.map(async (file: string) => {
        const result = await cloudinary.uploader.upload(file, {
          folder: "travel_point",
          resource_type: "image",
          access_mode: "public",
          allowed_formats: ["jpg", "png"],
          use_filename: true,
        });
        const image = {
          secure_url: result.secure_url,
          public_id: result.public_id,
        };
        return image;
      })
    );

    return uploadedFiles;
  } catch (error) {
    new ApiError(httpStatus.BAD_REQUEST, "Error uploading images");
    return [];
  }
};
