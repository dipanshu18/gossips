import { WebSocket } from "ws";
import Redis from "ioredis";

const onlineUsers: { [userId: string]: WebSocket } = {};

const pub = new Redis({
  host: "redis",
});
const sub = new Redis({
  host: "redis",
});
const client = new Redis({
  host: "redis",
});

export class UserManager {
  constructor(userId: string, socket: WebSocket) {
    onlineUsers[userId] = socket;
    client.sadd("online_users", userId);
    sub.subscribe("MESSAGES");
    sub.subscribe(`USER:${userId}`);

    sub.on("message", (channel, message) => {
      if (channel === `USER:${userId}`) {
        const uSocket = onlineUsers[userId];
        if (uSocket && uSocket.readyState === WebSocket.OPEN) {
          uSocket.send(message);
        }
      }
    });

    socket.on("close", () => {
      this.removeUser(userId);
    });
  }

  sendMessage(message: {
    userId: string;
    receiverId: string;
    chatId: string;
    text: string;
  }) {
    const receiverId = message.receiverId;
    if (onlineUsers[receiverId]) {
      const rSocket = onlineUsers[receiverId];
      rSocket.send(JSON.stringify(message));
    } else {
      pub.publish(`USER:${receiverId}`, JSON.stringify(message));
    }
  }

  removeUser(userId: string) {
    delete onlineUsers[userId];
    client.srem("online_users", userId);
  }
}
