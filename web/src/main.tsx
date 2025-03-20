import "./styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { SocketProvider } from "./contexts/SocketContext.tsx";
import { BrowserRouter } from "react-router";
import { Navbar } from "./components/Navbar.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <Navbar />
        <App />
        <Toaster position="top-right" richColors />
      </SocketProvider>
    </BrowserRouter>
  </StrictMode>
);
