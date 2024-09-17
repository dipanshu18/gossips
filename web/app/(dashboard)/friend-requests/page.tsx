import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Image from "next/image";

export default function FriendRequests() {
  return (
    <div>
      <h1 className="text-center my-5 font-semibold text-xl">
        Friend Requests
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-5 lg:grid-cols-3">
        <Card>
          <CardContent>
            <CardDescription className="space-y-3 p-4">
              <div className="flex justify-center">
                <div className="flex w-20 h-20 border-2 rounded-full">
                  <Image
                    src="/logo.png"
                    alt="User profile picture"
                    width={100}
                    height={100}
                    priority
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              </div>
              <p className="text-xl font-normal dark:text-white">
                User full name
              </p>
              <div className="flex gap-5 flex-wrap sm:flex-nowrap">
                <Button className="w-full">Accept</Button>
                <Button className="w-full" variant="destructive">
                  Decline
                </Button>
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
