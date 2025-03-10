export interface IChat {
  id: string;
  isGroup: boolean;
  name?: string;
  groupAvatarUrl?: string;
  participants: {
    user: {
      id: string;
      name: string;
      image: string;
    };
    role: "ADMIN" | "MEMBER";
  }[];
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  id: string;
  type: "TEXT" | "IMAGE" | "FILE" | "VIDEO";
  mediaUrl: string | null;
  text: string | null;
  chatId: string;
  senderId: string;
  sender: {
    id: string;
    name: string;
    college: string;
    image: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
