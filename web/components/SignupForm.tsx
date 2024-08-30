"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { User } from "lucide-react";

export default function SignupForm() {
  const [signupData, setSignupData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
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

  async function handleSignup(e: FormEvent) {
    e.preventDefault();

    console.log(signupData);
  }

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-md w-full mx-auto border rounded-md space-y-4 p-5 shadow"
    >
      <div className="flex flex-col md:flex-row items-center gap-5">
        <label
          htmlFor="profile"
          className={cn(
            "flex items-center justify-center h-24 w-24 flex-shrink-0 border rounded-full",
            imagePreview ? "p-0" : "p-5"
          )}
        >
          {imagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
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
        <Input type="file" accept="image/*" className="bg-inherit" />
      </div>
      <div>
        <label>Full Name</label>
        <Input
          className="bg-inherit"
          type="text"
          placeholder="your full name"
          onChange={(e) =>
            setSignupData({ ...signupData, name: e.target.value })
          }
          value={signupData.name}
        />
      </div>
      <div>
        <label>Email</label>
        <Input
          className="bg-inherit"
          type="email"
          placeholder="your email"
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
          }
          value={signupData.email}
        />
      </div>
      <div>
        <label>Password</label>
        <Input
          className="bg-inherit"
          type="password"
          placeholder="your password"
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
          value={signupData.password}
        />
      </div>

      <Button type="submit" className="w-full">
        Create account
      </Button>
    </form>
  );
}
