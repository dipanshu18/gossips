import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, type JwtPayload } from "jsonwebtoken";

import { UNAUTHORIZED } from "../constants/httpStatus";
import { JWT_ACCESS_SECRET } from "../constants/env";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.cookies.accessToken as string | undefined;

  if (!accessToken) {
    return res.status(UNAUTHORIZED).json({
      message: "Unauthorized",
    });
  }

  let decoded: JwtPayload | undefined;
  try {
    decoded = jwt.verify(accessToken, JWT_ACCESS_SECRET) as JwtPayload;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      if (error.message === "token-expired") {
        return res.status(UNAUTHORIZED).json({
          message: "Token expired",
        });
      }
    }
  }

  if (!decoded) {
    return res.status(UNAUTHORIZED).json({
      message: "Invalid token",
    });
  }

  req.user = { id: decoded.id, email: decoded.email };
  next();
}
