import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";

import { authRouter } from "./routes/auth.route";
import { authMiddleware } from "./middlewares/auth.middleware";
import { userRouter } from "./routes/user.route";

const app = express();
const httpServer = createServer(app);
const io = new Server();
io.attach(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("LOG:", req.path, req.method);
  next();
});

app.get("/", (req: Request, res: Response) => {
  return res.json({ status: "working..." });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authMiddleware, userRouter);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("message", ({ msg }) => {
    console.log(msg);
    socket.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    socket.emit(socket.id + "client disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
