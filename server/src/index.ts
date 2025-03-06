import http from "node:http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { WebSocketServer, type WebSocket } from "ws";

import "dotenv/config";
const PORT = process.env.PORT as string;
const WS_PORT = process.env.WS_PORT as string;

import { UserManager } from "./sockets/userManager";

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
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
    user.sendMessage(decoded);
  });

  socket.on("close", () => {
    user.removeUser(userId as string);
    socket.close();
    console.log("Client disconnected", userId);
  });
});

server.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
