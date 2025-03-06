import "dotenv/config";
const REDIS_URL = process.env.REDIS_URL as string;

import type { WebSocket } from "ws";
import Redis from "ioredis";

interface IMessage {
  userId: string;
  chatId: string;
  text: string;
}

const localOnlineUsers: { [userId: string]: WebSocket } = {};

const redisClient = new Redis(REDIS_URL);
const redisPub = redisClient.duplicate();
const redisSub = redisClient.duplicate();

redisSub.psubscribe("chat:*");

redisSub.on("pmessage", async (_, channel, message) => {
  const parsed = JSON.parse(message.toString()) as {
    type: "new_message";
    message: IMessage;
  };
  const chatId = channel.split(":")[1];

  const participants = await redisClient.smembers(
    `chat_participants:${chatId}`
  );

  // biome-ignore lint/complexity/noForEach: <explanation>
  participants.forEach((userId) => {
    if (localOnlineUsers[userId]) {
      localOnlineUsers[userId].send(
        JSON.stringify({
          type: "new_message",
          message: parsed.message,
        })
      );
    }
  });
});

export class UserManager {
  constructor(userId: string, socket: WebSocket, chatId: string) {
    localOnlineUsers[userId] = socket;
    redisClient.sadd("online_users", userId);
    redisClient.sadd(`chat_participants:${chatId}`, userId);
  }

  async sendMessage(message: IMessage) {
    const { chatId } = message;

    const participants = await redisClient.smembers(
      `chat_participants:${chatId}`
    );

    if (participants.length > 0) {
      // biome-ignore lint/complexity/noForEach: <explanation>
      participants.forEach((userId) => {
        if (localOnlineUsers[userId]) {
          localOnlineUsers[userId].send(
            JSON.stringify({
              type: "new_message",
              message,
            })
          );
        }
      });
    } else {
      await redisPub.publish(
        `chat:${chatId}`,
        JSON.stringify({ type: "new_message", message })
      );
    }
  }

  async removeUser(userId: string, chatId?: string) {
    delete localOnlineUsers[userId];
    await redisClient.srem("online_users", userId);
    await redisClient.srem(`chat_participants:${chatId}`, userId);
  }
}
