import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/me", getUserProfile);

export default userRoutes;
