import Image from "next/image";

export default function LeftChatBubble() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex w-12 h-12 flex-shrink-0">
        <Image
          src={"/logo.png"}
          alt="User profile picture"
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-full border-2"
        />
      </div>
      <div className="max-w-md lg:max-w-xl w-full bg-slate-900 py-4 pl-4 text-white rounded-md">
        <p className="font-semibold">User full name</p>
        <p>Chat 1</p>
      </div>
    </div>
  );
}
