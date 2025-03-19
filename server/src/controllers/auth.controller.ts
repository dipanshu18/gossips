import type { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import {
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
  UNPROCESSABLE_CONTENT,
} from "../constants/httpStatus";
import { signupSchema } from "../schemas/auth.schema";
import { db } from "../utils/db";
import { hashValue } from "../utils/bcrypt";
import { ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow } from "../utils/date";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import {
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
} from "../utils/cookies";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../constants/env";

export async function signupHandler(req: Request, res: Response) {
  try {
    const request = signupSchema.safeParse(req.body);

    if (!request.success) {
      res.status(UNPROCESSABLE_CONTENT).json({
        message:
          "Please send correct inputs like email, name, image, password, confirm password",
      });
      return;
    }

    const { image, name, email, password } = request.data;
    const existingUser = await db.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      res.status(CONFLICT).json({
        message: "User already exists",
      });
      return;
    }

    const hashPassword = await hashValue(password);
    const newUser = await db.user.create({
      data: {
        image,
        name,
        email,
        password: hashPassword,
      },
      omit: {
        password: true,
      },
    });

    const verificationCode = await db.verificationCode.create({
      data: {
        type: "EMAIL_VERIFICATION",
        userId: newUser.id,
        expiresAt: oneYearFromNow(),
      },
    });

    // send a verification email

    const refreshToken = generateRefreshToken(newUser.id);
    const accessToken = generateAccessToken(newUser);

    res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());
    res.cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

    res.status(CREATED).json({
      user: newUser,
      refreshToken,
      accessToken,
    });
    return;
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
    return;
  }
}

export async function refreshTokenHandler(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken as string | undefined;

    if (!refreshToken) {
      res.status(UNAUTHORIZED).json({
        message: "Missing refresh token",
      });
      return;
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    if (!decoded) {
      res.status(UNAUTHORIZED).json({
        message: "Invalid refresh token",
      });
      return;
    }

    const { exp, id } = decoded as JwtPayload;
    let newRefreshToken: string | undefined;
    let newAccessToken: string | undefined;
    if (exp && exp - Date.now() <= ONE_DAY_MS) {
      const user = await db.user.findFirst({ where: { id } });

      if (!user) {
        res.status(UNAUTHORIZED).json({ message: "Invalid refresh token" });
        return;
      }

      newRefreshToken = generateRefreshToken(id);
      newAccessToken = generateAccessToken(user);
    }

    if (newRefreshToken) {
      res.cookie(
        "refreshToken",
        newRefreshToken,
        getRefreshTokenCookieOptions()
      );
    }

    res.cookie("accessToken", newAccessToken, getAccessTokenCookieOptions());

    res.status(OK).json({
      message: "Access token refreshed",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
    return;
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
    return;
  }
}

export async function logoutHandler(req: Request, res: Response) {
  const accessToken = req.cookies.accessToken as string | undefined;
  const decoded = jwt.verify(
    accessToken || "",
    JWT_ACCESS_SECRET
  ) as JwtPayload;

  if (!decoded) {
    res.status(UNAUTHORIZED).json({
      message: "Invalid refresh token",
    });
    return;
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken", { path: "/auth/refresh" });
  res.status(OK).json({ message: "Logout successful" });
  return;
}

// export async function verifyEmailHandler() {}

// export async function sendResetPasswordEmailHandler() {}

// export async function passwordResetHandler() {}
