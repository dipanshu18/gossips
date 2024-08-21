import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    allowedHeaders: "*",
    origin: "*",
  },
});

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

httpServer.listen(8080, () => {
  console.log("Server started on port:", 8080);
});
