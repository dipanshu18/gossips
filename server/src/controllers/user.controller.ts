import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const userModel = new PrismaClient().user;

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.body.user;
    const user = await userModel.findUnique({
      where: { id },
      select: {
        email: true,
        name: true,
        image: true,
        id: true,
        password: false,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
