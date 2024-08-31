import { z } from "zod";

export const SignupSchema = z.object({
  image: z
    .instanceof(File, { message: "Please provide a image" })
    .refine((file) => file.type === "image/jpeg")
    .nullable(),
  name: z
    .string()
    .min(4, { message: "Name must be minimum 4 characters long" }),
  email: z.string().email({ message: "Email must be a valid" }),
  password: z
    .string()
    .min(5, { message: "Password must be minimum 5 characters" })
    .max(10, { message: "Password must be maximum 10 characters long" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email must be valid" }),
  password: z.string(),
});
