"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function login(values: z.infer<typeof LoginSchema>) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        values,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = await response.data;

        toast.success(data.msg);

        router.replace("/home");
        return router.refresh();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data.msg;
        toast.error(errorData);

        // if (errorData) {
        //   if (typeof errorData === "object") {
        //     Object.entries(errorData).forEach(async ([field, message]) => {
        //       toast.error(`${field}: ${message}`);
        //     });
        //   }
        // }
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="max-w-md w-full mx-auto border rounded-md space-y-4 p-5 shadow"
    >
      <div className="space-y-2">
        <label className={cn(errors.email && "text-red-500")}>Email</label>
        <Input
          className="bg-inherit"
          type="email"
          placeholder="your email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="space-y-2">
        <label className={cn(errors.password && "text-red-500")}>
          Password
        </label>
        <Input
          className="bg-inherit"
          type="password"
          placeholder="your password"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <Button disabled={isSubmitting} type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
