"use client";

import { useCallback, useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const socket = io("ws://localhost:8080");

  return (
    <main>
      <h1>Hello, there!</h1>
    </main>
  );
}
