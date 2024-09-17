"use client";

import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfileCircle() {
  const [user, setUser] = useState<{ image: string }>();

  async function fetchUserProfile() {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/user", {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = await response.data.user;
        setUser(data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data.msg;
        toast(errorData);
      }
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex w-10 h-10">
      {user && (
        <Image
          src={`https://d16xizhmjefubb.cloudfront.net/${user.image}`}
          alt="User profile image"
          height={100}
          width={100}
          priority
          className="rounded-full w-full h-full"
        />
      )}
    </div>
  );
}
