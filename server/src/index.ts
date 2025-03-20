import http from "node:http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { WebSocketServer, type WebSocket } from "ws";

import { APP_ORIGIN, PORT, WS_PORT } from "./constants/env";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import { UserManager } from "./sockets/userManager";
import passport from "passport";
import { authenticate } from "./middlewares/authenticate";
import cloudinaryRoutes from "./routes/cloudinary.route";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: APP_ORIGIN,
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(passport.initialize());

app.use((req, _res, next) => {
  console.log(req.method, req.path);
  console.log();
  next();
});

const server = http.createServer(app);

const wss = new WebSocketServer({
  port: Number(WS_PORT),
});

wss.on("connection", (socket: WebSocket, request) => {
  socket.on("error", (err) => {
    console.log("Error:", err);
  });

  console.log("Client connected");

  // const user = new UserManager(String(userId), socket, String(chatId));

  // socket.on("message", (data) => {
  //   const decoded = JSON.parse(data.toString());
  //   user.sendMessage({ userId, ...decoded });
  // });

  socket.on("close", () => {
    // user.removeUser(userId as string, chatId as string);
    socket.close();
    console.log("Client disconnected");
  });
});

app.use("/api/media", cloudinaryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", authenticate, userRoutes);

server.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
