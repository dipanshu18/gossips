"use client";

import { type FormEvent } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function LogoutBtn() {
  const router = useRouter();

  async function logout(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = await response.data;
        toast.success(data.msg);

        router.replace("/login");
        return router.refresh();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data.msg;
        toast.error(errorData);
      }
    }
  }

  return (
    <Button type="submit" onClick={logout}>
      Logout
    </Button>
  );
}
