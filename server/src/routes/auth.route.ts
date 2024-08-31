import express from "express";
import multer from "multer";

import { signup, login, logout } from "../controllers/auth.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = express.Router();

const upload = multer({});
authRouter.post("/signup", upload.single("image"), signup);

authRouter.post("/login", login);

authRouter.post("/logout", authMiddleware, logout);

export { authRouter };
