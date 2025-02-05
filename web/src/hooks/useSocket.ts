import { useContext } from "react";
import SocketContext from "../contexts/SocketContext";

export function useSocket() {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error("Socket Context must be used within Socket Provider");
  }

  return context;
}
