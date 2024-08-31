import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import LeftChatBubble from "./LeftChatBubble";
import RightChatBubble from "./RightChatBubble";

export default function ChatContent() {
  return (
    <div className="flex flex-col w-full">
      <div className="border-b flex items-center gap-2 p-4">
        <Image
          src={"/logo.png"}
          alt="User profile photo"
          width={100}
          height={100}
          className="w-10 h-10 object-cover border rounded-full"
        />
        <h1 className="font-extrabold md:text-2xl">User Full Name</h1>
      </div>
      <div className="flex-grow p-5 overflow-y-auto space-y-5 max-h-[calc(100vh-20rem)]">
        <LeftChatBubble />
        <RightChatBubble />
        <RightChatBubble />
        <RightChatBubble />
        <LeftChatBubble />

        <RightChatBubble />
        <LeftChatBubble />
        <RightChatBubble />
        <LeftChatBubble />
        <LeftChatBubble />
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
