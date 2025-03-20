import type { Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../constants/httpStatus";
import { db } from "../utils/db";

export async function getUserProfile(req: Request, res: Response) {
  try {
    const user = await db.user.findFirst({
      where: {
        id: req.user.id,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      res.status(NOT_FOUND).json({
        message: "No user found",
      });
      return;
    }

    res.status(OK).json({ user });
    return;
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
}
