import { useState } from "react";
import ChatBox from "../components/ChatBox";
import useMobileView from "../hooks/useMobileView";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(0);
  const isMobile = useMobileView(628);

  return (
    <div className="flex h-[90dvh] scrollbar-thumb-neutral-800 scrollbar-track-neutral-950">
      <div className="md:max-w-2xs lg:max-w-md flex-1 h-full scrollbar-thin md:overflow-y-auto gap-2 flex flex-col py-2">
        {Array(17)
          .fill("")
          .map((_, idx) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={idx}
              onClick={() =>
                isMobile ? navigate(`/home/${idx}`) : setSelectedChat(idx)
              }
              className={
                "cursor-pointer flex items-center gap-1 bg-base-200 rounded-md py-5 pl-5 hover:bg-base-200"
              }
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
      <div className="flex-1 hidden md:block p-2">
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
