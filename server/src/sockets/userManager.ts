import type { WebSocket } from "ws";
import Redis from "ioredis";

const onlineUsers: { [userId: string]: WebSocket } = {};

const client = new Redis({
  host: "redis",
});

const pub = client.duplicate();
const sub = client.duplicate();

export class UserManager {
  constructor(userId: string, socket: WebSocket) {
    onlineUsers[userId] = socket;
    client.sadd("online_users", userId);
    sub.subscribe("MESSAGES");
  }

  sendMessage(message: {
    userId: string;
    receiverId: string;
    chatId: string;
    text: string;
  }) {
    const receiverId = message.receiverId;
    const userId = message.userId;
    const uSocket = onlineUsers[userId];
    // if (onlineUsers[receiverId]) {
    //   const rSocket = onlineUsers[receiverId];
    //   rSocket.send(JSON.stringify(message));
    // } else {
    pub.publish("MESSAGES", JSON.stringify(message));

    sub.on("message", (channel, message) => {
      if (
        channel === "MESSAGES" &&
        JSON.parse(message).receiverId === receiverId
      ) {
        const rsocket = onlineUsers[receiverId];
        rsocket.send(message);
      }
    });
    // }
    uSocket.send(JSON.stringify(message));
  }

  removeUser(userId: string) {
    delete onlineUsers[userId];
    client.srem("online_users", userId);
  }
}
