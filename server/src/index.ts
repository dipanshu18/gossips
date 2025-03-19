import http from "node:http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { WebSocketServer, type WebSocket } from "ws";

import { UserManager } from "./sockets/userManager";
import { APP_ORIGIN, PORT, WS_PORT } from "./constants/env";

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: APP_ORIGIN,
  })
);

app.use(cookieParser());

const server = http.createServer(app);

const wss = new WebSocketServer({
  port: Number(WS_PORT),
});

wss.on("connection", (socket: WebSocket, request) => {
  socket.on("error", (err) => {
    console.log("Error:", err);
  });

  const userId = request.url?.split("?")[1].split("&")[0].split("=")[1];
  const chatId = request.url?.split("?")[1].split("&")[1].split("=")[1];

  console.log("Client connected", userId);

  const user = new UserManager(String(userId), socket, String(chatId));

  socket.on("message", (data) => {
    const decoded = JSON.parse(data.toString());
    user.sendMessage({ userId, ...decoded });
  });

  socket.on("close", () => {
    user.removeUser(userId as string, chatId as string);
    socket.close();
    console.log("Client disconnected", userId);
  });
});

server.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
