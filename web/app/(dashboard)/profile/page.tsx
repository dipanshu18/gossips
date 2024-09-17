"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const [user, setUser] = useState<{
    image: string;
    name: string;
    id: string;
    email: string;
  }>();

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
    <div className="">
      <Card className="p-5 my-5 max-w-xl mx-auto">
        <CardContent>
          <CardTitle className="text-center mb-5">Profile</CardTitle>
          <CardDescription className="grid place-content-center space-y-5">
            {user && (
              <>
                <div className="flex justify-center w-full">
                  <div className="flex w-32 h-32 rounded-full">
                    <Image
                      src={`https://d16xizhmjefubb.cloudfront.net/${user.image}`}
                      alt={`${user.name} profile image`}
                      width={500}
                      height={500}
                      priority
                      className="object-cover flex w-full h-full rounded-full"
                    />
                  </div>
                </div>
                <h1>
                  Name:{" "}
                  <span className="text-black dark:text-white font-bold text-lg">
                    {user.name}
                  </span>
                </h1>
                <h1>
                  Email:{" "}
                  <span className="text-black dark:text-white font-bold text-lg">
                    {user.email}
                  </span>
                </h1>
              </>
            )}
          </CardDescription>
          <CardFooter className="flex justify-center gap-5 mt-5 p-0">
            <Button>Update profile</Button>
            <Button variant="destructive">Delete profile</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
