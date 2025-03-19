import { Router } from "express";
import {
  logoutHandler,
  refreshTokenHandler,
  signupHandler,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/signup", signupHandler);
authRoutes.post("/login");
authRoutes.post("/login/google");
authRoutes.post("/google/callback");
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/refresh", refreshTokenHandler);
authRoutes.get("/email/verify/:code");
authRoutes.post("/password/forgot");
authRoutes.post("/password/reset");

export default authRoutes;
