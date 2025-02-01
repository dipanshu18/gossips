import http from "node:http";
import { WebSocketServer, type WebSocket } from "ws";

import dotenv from "dotenv";
import { UserManager } from "./sockets/userManager";
dotenv.config();
const PORT = process.env.PORT;

const server = http.createServer();

const wss = new WebSocketServer({
  port: 7778,
});

wss.on("connection", (socket: WebSocket, request) => {
  socket.on("error", (err) => {
    console.log("Error:", err);
  });

  const userId = request.url?.split("?")[1].split("=")[1];
  console.log("Client connected", userId);

  const user = new UserManager(String(userId), socket);

  socket.on("message", (data) => {
    const decoded = JSON.parse(data.toString());

    user.sendMessage(decoded);
  });

  socket.on("close", () => {
    user.removeUser(userId as string);
    socket.close();
  });
});

server.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
