import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";

import type { IChat, IMessage } from "../../types";

interface ISocketContext {
  socket: WebSocket | undefined;
  getChat: (id: string) => void;
  chat: IChat | undefined;
  messages: IMessage[];
  sendMessage: (msg: string) => void;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const [chat, setChat] = useState<IChat>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const getChat = useCallback(async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:7777/api/v1/chats/${id}`
      );

      if (response.status === 200) {
        const data = await response.data.chats;
        setChat(data);
        setMessages(data.messages);
        return;
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  }, []);

  const sendMessage = useCallback(
    (msg: string) => {
      const payload = JSON.stringify({
        type: "new_message",
        message: {
          chatId: chat?.id,
          text: msg,
        },
      });
      socket?.send(payload);
    },
    [chat?.id, socket]
  );

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:7778");
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
    <SocketContext.Provider
      value={{ socket, getChat, chat, messages, sendMessage }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContext;
