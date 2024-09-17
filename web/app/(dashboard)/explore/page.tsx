import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Image from "next/image";

export default function Explore() {
  return (
    <div>
      <h1 className="text-center my-5 text-xl font-semibold">
        Explore and find new friends
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 p-5 md:grid-cols-3 lg:grid-cols-4">
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
              <h1 className="text-xl font-normal dark:text-white">
                User full name
              </h1>
              <Button className="w-full">Add friend</Button>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
