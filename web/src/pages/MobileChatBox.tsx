import { Link, useNavigate, useParams } from "react-router";
import { FaArrowLeft, FaPhoneAlt, FaVideo } from "react-icons/fa";

export default function MobileChatBox() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[90dvh] bg-base-200 rounded-md scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 mt-5">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center">
          <FaArrowLeft
            onClick={() => navigate("/home")}
            className="mr-2 text-xl text-neutral-300"
          />

          <Link to={`/profile/${id}`}>
            <div className="flex items-center gap-2">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-sm font-bold">Name name {id}</h1>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <FaPhoneAlt className="text-xl text-neutral-300" />

          <FaVideo className="text-xl text-neutral-300" />
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-5 scrollbar-thin bg-base-100 overflow-y-auto">
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
          className="textarea w-full rounded-xl"
          placeholder="enter your message"
        />
      </div>
    </div>
  );
}
