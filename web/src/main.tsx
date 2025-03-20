import "./styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { SocketProvider } from "./contexts/SocketContext.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <App />
        <Toaster position="top-right" richColors />
      </SocketProvider>
    </BrowserRouter>
  </StrictMode>
);
