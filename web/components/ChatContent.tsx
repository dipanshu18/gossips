import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import LeftChatBubble from "./LeftChatBubble";
import RightChatBubble from "./RightChatBubble";

export default function ChatContent() {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="border flex items-center gap-2 p-4">
        <Image
          src={"/logo.png"}
          alt="User profile photo"
          width={100}
          height={100}
          className="w-10 h-10 object-cover border rounded-full"
        />
        <h1 className="font-extrabold md:text-2xl">User Full Name</h1>
      </div>
      <div className="flex-grow p-5 overflow-y-scroll">
        <LeftChatBubble />
        <RightChatBubble />
      </div>
      <div className="flex gap-5 p-5">
        <Input placeholder="your message" />
        <Button>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
