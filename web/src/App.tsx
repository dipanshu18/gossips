import { type FormEvent, useEffect, useRef, useState } from "react";

export default function App() {
  const [socket, setSocket] = useState<WebSocket | undefined>();
  const userIdRef = useRef<HTMLInputElement>(null);
  const receiverIdRef = useRef<HTMLInputElement>(null);
  const messageIdRef = useRef<HTMLInputElement>(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:7778?userId=${userId}`);

    setSocket(ws);

    ws.onmessage = (event) => {
      console.log(event);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [userId]);

  function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    const payload = JSON.stringify({
      userId: userIdRef.current?.value,
      receiverId: receiverIdRef.current?.value,
      chatId: "1",
      text: messageIdRef.current?.value,
    });
    socket?.send(payload);
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Hello, world</h1>

      <div>
        <input type="text" placeholder="userid" ref={userIdRef} name="" id="" />
      </div>
      <div>
        <input
          type="text"
          placeholder="receiver"
          ref={receiverIdRef}
          name=""
          id=""
        />
      </div>

      <div>
        <input
          ref={messageIdRef}
          type="text"
          placeholder="message"
          name=""
          id=""
        />
        <button onClick={handleSendMessage} type="submit">
          send
        </button>
      </div>
    </div>
  );
}
