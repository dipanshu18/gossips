import { useRef } from "react";
import { useSocket } from "./hooks/useSocket";

export default function App() {
  const { messages, sendMessage } = useSocket();
  const messageRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<HTMLInputElement>(null);
  const receiverIdRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Hello, world</h1>

      <div>
        <input ref={userIdRef} type="text" placeholder="userId" name="" id="" />
        <input
          ref={receiverIdRef}
          type="text"
          placeholder="receiverId"
          name=""
          id=""
        />
      </div>
      <div>
        {messages ? (
          messages.map((item, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={idx}>
              <p className="text-xl text-black">{item}</p>
            </div>
          ))
        ) : (
          <h1>No messages</h1>
        )}
      </div>

      <div>
        <input
          ref={messageRef}
          type="text"
          placeholder="message"
          name=""
          id=""
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            sendMessage(
              JSON.stringify({
                userId: userIdRef.current?.value,
                receiverId: receiverIdRef.current?.value,
                text: messageRef.current?.value,
                chatId: 1,
              })
            );
          }}
          type="submit"
        >
          send
        </button>
      </div>
    </div>
  );
}
