import type { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, type JwtPayload } from "jsonwebtoken";

import { FORBIDDEN, UNAUTHORIZED } from "../constants/httpStatus";
import { JWT_ACCESS_SECRET } from "../constants/env";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.cookies.accessToken as string | undefined;

  if (!accessToken) {
    res.status(FORBIDDEN).json({
      message: "No access token",
    });
    return;
  }

  let decoded: JwtPayload | undefined;
  try {
    decoded = jwt.verify(accessToken, JWT_ACCESS_SECRET) as JwtPayload;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      if (error.message === "token-expired") {
        res.status(FORBIDDEN).json({
          message: "Token expired",
        });
        return;
      }
    }
  }

  if (!decoded) {
    res.status(UNAUTHORIZED).json({
      message: "Invalid token",
    });
    return;
  }

  req.user = { id: decoded.id, email: decoded.email };
  next();
}
