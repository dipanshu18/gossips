import { useState } from "react";
import ChatBox from "../components/ChatBox";

export default function Home() {
  const [selectedChat, setSelectedChat] = useState(0);

  return (
    <div className="border md:border-x flex h-[90dvh]">
      <div className="md:border-r md:max-w-xs flex-1 h-full overflow-y-auto">
        {Array(17)
          .fill("")
          .map((_, idx) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={idx}
              onClick={() => setSelectedChat(idx)}
              className={`cursor-pointer flex items-center gap-2 border-t py-5 pl-5 hover:bg-base-200 ${
                idx === 16 && "border-b"
              }`}
            >
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <h1>Name name</h1>
            </div>
          ))}
      </div>
      <div className="flex-1 hidden md:block">
        {selectedChat ? (
          <ChatBox chatId={selectedChat} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-xl font-extrabold">
              Select a chat to start messaging
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
