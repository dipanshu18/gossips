import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;

import { PrismaClient } from "@prisma/client";
import { type Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { LoginSchema, SignupSchema } from "../types/auth";
import { client } from "../utils/s3";
import axios from "axios";

const userModel = new PrismaClient().user;

export async function signup(req: Request, res: Response) {
  try {
    const result = SignupSchema.safeParse({
      ...req.body,
      image: req.file?.buffer,
    });

    if (!result.success) {
      // Extract error messages from Zod's error object
      const errors = result.error.format();

      // Prepare a structured error message object
      const errorMessages: Record<string, string> = {};

      Object.entries(errors).forEach(([field, error]) => {
        if (field !== "_errors") {
          // Exclude the '_errors' field
          if (Array.isArray(error)) {
            // If error is a string array, join the messages
            errorMessages[field] = error.join(", ");
          } else if (error && "_errors" in error) {
            // If error is an object with _errors key, join those messages
            errorMessages[field] = error._errors.join(", ");
          }
        }
      });
      return res.status(400).json({
        msg: errorMessages, // Sending a structured object without the '_errors' key
      });
    }

    const { image, name, email, password } = result.data;

    const userExists = await userModel.findUnique({ where: { email } });

    if (userExists) {
      return res.status(400).json({ msg: "User already exists. Please login" });
    }

    const key = `profile/${email}/${crypto.randomUUID()}.jpg`;
    const command = new PutObjectCommand({
      Key: key,
      Bucket: process.env.AWS_BUCKET!,
      ContentType: "image/jpeg",
    });

    const url = await getSignedUrl(client, command);

    await axios.put(url, image);

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      data: {
        image: key,
        name,
        email,
        password: hashPass,
      },
    });

    if (newUser) {
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        SECRET as string
      );

      res.cookie("session", token);
      return res.status(201).json({ msg: "Account created" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const result = LoginSchema.safeParse(req.body);

    if (!result.success) {
      // Extract error messages from Zod's error object
      const errors = result.error.format();

      // Prepare a structured error message object
      const errorMessages: Record<string, string> = {};

      Object.entries(errors).forEach(([field, error]) => {
        if (field !== "_errors") {
          // Exclude the '_errors' field
          if (Array.isArray(error)) {
            // If error is a string array, join the messages
            errorMessages[field] = error.join(", ");
          } else if (error && "_errors" in error) {
            // If error is an object with _errors key, join those messages
            errorMessages[field] = error._errors.join(", ");
          }
        }
      });
      return res.status(400).json({
        msg: errorMessages, // Sending a structured object without the '_errors' key
      });
    }

    const { email, password } = result.data;

    const userExists = await userModel.findUnique({ where: { email } });

    if (!userExists) {
      return res
        .status(400)
        .json({ msg: "Account doesn't exist. Please create one" });
    }

    const validPass = await bcrypt.compare(password, userExists.password);

    if (!validPass) {
      return res.status(400).json({ msg: "Invalid credentails" });
    }

    const token = jwt.sign(
      { id: userExists.id, email: userExists.email },
      SECRET as string
    );
    res.cookie("session", token);
    return res.status(200).json({ msg: "Credentials verified" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("session");
  return res.status(200).json({ msg: "Logging out!" });
}
