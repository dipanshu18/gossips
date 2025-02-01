import { createContext, type ReactNode } from "react";

interface ISocketContext {
  socket: WebSocket;
  messages: string[];
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  return;
}

export default SocketContext;
