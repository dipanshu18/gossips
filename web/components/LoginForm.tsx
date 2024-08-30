"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function LoginForm() {
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    console.log(loginData);
  }

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md w-full mx-auto border rounded-md space-y-4 p-5 shadow"
    >
      <div>
        <label>Email</label>
        <Input
          className="bg-inherit"
          type="email"
          placeholder="your email"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          value={loginData.email}
        />
      </div>
      <div>
        <label>Password</label>
        <Input
          className="bg-inherit"
          type="password"
          placeholder="your password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          value={loginData.password}
        />
      </div>

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
