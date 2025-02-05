import { createContext, useCallback, useEffect, useState } from "react";

interface ISocketContext {
  socket: WebSocket | undefined;
  messages: string[];
  sendMessage: (msg: string) => void;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg: string) => {
      if (socket) {
        socket.send(msg);
      }
    },
    [socket]
  );

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const ws = new WebSocket(`ws://localhost:7778?userId=${userId}`);
    setSocket(ws);

    ws.onmessage = (event) => {
      const decoded = JSON.parse(event.data);
      setMessages((prev) => [...prev, decoded.text]);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
        setSocket(undefined);
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, messages, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContext;
