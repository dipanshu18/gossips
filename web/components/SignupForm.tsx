"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";

import { SignupSchema } from "@/types/zodSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function signup(values: z.infer<typeof SignupSchema>) {
    const formData = new FormData();
    console.log(values);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signup",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const data = await response.data;

        toast.success(data.msg);

        router.replace("/home");
        return router.refresh();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data.msg;
        toast.error(errorData);

        console.log(errorData);
        if (errorData) {
          if (typeof errorData === "object") {
            Object.entries(errorData).forEach(async ([field, message]) => {
              toast.error(`${field}: ${message}`);
            });
          }
        }
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(signup)}
      className="max-w-md w-full mx-auto border rounded-md space-y-4 p-5 shadow"
    >
      <div className="flex flex-col md:flex-row items-center gap-5">
        <label
          htmlFor="profile"
          className={cn(
            "flex items-center justify-center h-24 w-24 flex-shrink-0 border rounded-full",
            imagePreview ? "p-0" : "p-5",
            errors?.image && "text-red-500"
          )}
        >
          {imagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              id="profile"
              src={imagePreview}
              alt="Selected Image"
              width={100}
              height={100}
              quality={100}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User size={50} />
          )}
        </label>
        <Input
          type="file"
          accept="image/jpeg"
          className="bg-inherit"
          onChange={(e) => {
            register("image", { value: e.target.files && e.target.files[0] });
            handleImageChange(e);
          }}
          {...register}
        />
        {errors?.image && (
          <span className="text-red-500">{errors?.image.message}</span>
        )}
      </div>
      <div className="space-y-2">
        <label className={cn(errors?.name && "text-red-500")}>Full Name</label>
        <Input
          className="bg-inherit"
          type="text"
          placeholder="your full name"
          {...register("name")}
        />
        {errors?.name && (
          <span className="text-red-500">{errors?.name.message}</span>
        )}
      </div>
      <div className="space-y-2">
        <label className={cn(errors?.email && "text-red-500")}>Email</label>
        <Input
          className="bg-inherit"
          type="email"
          placeholder="your email"
          {...register("email")}
        />
        {errors?.email && (
          <span className="text-red-500">{errors?.email.message}</span>
        )}
      </div>
      <div className="space-y-2">
        <label className={cn(errors?.password && "text-red-500")}>
          Password
        </label>
        <Input
          className="bg-inherit"
          type="password"
          placeholder="your password"
          {...register("password")}
        />
        {errors?.password && (
          <span className="text-red-500">{errors?.password.message}</span>
        )}
      </div>

      <Button disabled={isSubmitting} type="submit" className="w-full">
        Create account
      </Button>
    </form>
  );
}
