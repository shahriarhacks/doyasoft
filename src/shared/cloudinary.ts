import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "../config";
import ApiError from "../errors/api.error";

// Configuration
cloudinary.config({
  cloud_name: config.CLOUDINARY.CLOUD_NAME,
  api_key: config.CLOUDINARY.API_KEY,
  api_secret: config.CLOUDINARY.API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(`File is uploaded on Cloudinary : ${response.url}`);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);

    return null;
  }
};

export const deleteFromCloudinary = async (
  cloudinaryUrl: string
): Promise<any> => {
  try {
    // Extract the public ID from the image URL
    const publicIdMatch = cloudinaryUrl.match(/\/([^/]+)\.[^/.]+$/);
    if (!publicIdMatch) {
      throw new ApiError(400, "Invalid Cloudinary URL.");
    }
    const publicId = publicIdMatch[1];

    // Delete the image using the public ID
    const response = await cloudinary.uploader.destroy(publicId);

    if (response.result !== "ok") {
      throw new ApiError(500, "Error while deleting!!");
    }
    return response;
  } catch (error: any) {
    throw new ApiError(500, error?.message || "Error while deleting!!");
  }
};
