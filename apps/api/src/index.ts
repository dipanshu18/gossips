import express from "express";
import ws from "ws";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
const httpServer = app.listen(PORT);

const wss = new ws.WebSocketServer({ server: httpServer });
