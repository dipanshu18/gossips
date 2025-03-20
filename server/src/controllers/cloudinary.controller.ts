import type { Request, Response } from "express";
import type { UploadApiOptions } from "cloudinary";

import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  OK,
} from "../constants/httpStatus";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "../constants/env";
import cloudinary from "../utils/cloudinary";

export async function generateUploadUrl(req: Request, res: Response) {
  try {
    const { type } = req.query as { type: "image" | "video" | "raw" };

    const validTypes = ["image", "video", "raw"];
    if (!validTypes.includes(type)) {
      res.status(BAD_REQUEST).json({ message: "Invalid file type" });
      return;
    }

    const uploadPreset = "gossips";
    const timestamp = Math.floor(Date.now() / 1000);
    const options: UploadApiOptions = {
      upload_preset: uploadPreset,
      timestamp,
    };

    const signature = cloudinary.v2.utils.api_sign_request(
      options,
      CLOUDINARY_API_SECRET
    );

    res
      .status(OK)
      .json({ apiKey: CLOUDINARY_API_KEY, signature, timestamp, uploadPreset });
    return;
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
    return;
  }
}
