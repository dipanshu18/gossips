import jwt from "jsonwebtoken";

import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../constants/env";

interface IUser {
  id: string;
  email: string;
}

export function generateAccessToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
}
