import { z } from "zod";

export const signupSchema = z
  .object({
    image: z.string(),
    name: z.string().min(3),
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email().min(1).max(255),
  password: z.string(),
  userAgent: z.string().optional(),
});

export const verificationCodeSchema = z.string().min(1).max(25);

export const emailSchema = z.string().email().min(1).max(255);

export const resetPasswordSchema = z.object({
  verificationCode: z.string().min(1).max(25),
  password: z.string().min(6).max(255),
});
