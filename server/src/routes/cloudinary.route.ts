import { Router } from "express";
import { generateUploadUrl } from "../controllers/cloudinary.controller";

const cloudinaryRoutes = Router();

cloudinaryRoutes.get("/url", generateUploadUrl);

export default cloudinaryRoutes;
