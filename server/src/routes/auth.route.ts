import { Router } from "express";
import passport from "passport";

import {
  loginHandler,
  loginWithGoogleHandler,
  logoutHandler,
  refreshTokenHandler,
  signupHandler,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/signup", signupHandler);
authRoutes.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginHandler
);
authRoutes.get(
  "/login/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  loginWithGoogleHandler
);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/refresh", refreshTokenHandler);
authRoutes.get("/email/verify/:code");
authRoutes.post("/password/forgot");
authRoutes.post("/password/reset");

export default authRoutes;
