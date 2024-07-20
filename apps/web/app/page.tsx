import Image from "next/image";
import LandingPic from "../public/Landing.jpg";

export default function Home() {
  return (
    <div className="hero my-10">
      <div className="hero-content text-center items-center justify-center flex-wrap md:flex-nowrap gap-10">
        <Image
          src={LandingPic}
          height={400}
          width={300}
          className="rounded-full"
          alt="Girl chatting in a conversation image"
        />
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            A chat app that has features like one-to-one chat and group chat.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
