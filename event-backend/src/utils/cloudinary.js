import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs";
import path from "path"
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("No local file path");
      return null;
    }

    console.log("Uploading file:", localFilePath);

    console.log(
      "Exists:",
      fs.existsSync(localFilePath)
    );

   
const response = await cloudinary.uploader.upload(localFilePath, {
  folder: "eventx/events",
});

    console.log("SUCCESS:", response);

    fs.unlinkSync(localFilePath);

    return response;

  } catch (error) {

    console.log("FULL CLOUDINARY ERROR:");
    console.log(error);

    return null;
  }
};

export { uploadOnCloudinary };