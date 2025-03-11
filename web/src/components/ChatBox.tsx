export default function ChatBox({ chatId }: { chatId: number }) {
  return (
    <div className="flex flex-col h-[90dvh]">
      <div className="flex items-center gap-2 p-5 border-y">
        <img
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <h1>Name name {chatId}</h1>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-5 overflow-y-auto">
        {Array(20)
          .fill("")
          .map((_, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={idx}>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  Obi-Wan Kenobi
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
              </div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  Anakin
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
              </div>
            </div>
          ))}
      </div>

      {/* Input box */}

      <div className="p-5">
        <textarea
          className="textarea w-full"
          placeholder="enter your message"
        />
      </div>
    </div>
  );
}
