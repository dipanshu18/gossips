import { z } from "zod";

export const SignupSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be minimum 4 characters long" }),
  email: z.string().email({ message: "Email must be valid" }),
  password: z
    .string()
    .min(5, { message: "Password must be minimum 5 characters long" })
    .max(10, {
      message: "Password must be maximum 10 characters long",
    }),
  image: z.instanceof(Buffer),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email must be valid" }),
  password: z.string(),
});
