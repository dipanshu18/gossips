import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t px-8 py-5 flex flex-col gap-2 md:flex-row justify-between items-center">
      <div className="flex items-center gap-2">
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={100}
          height={100}
          className="object-cover w-10 h-10"
        />
        <h1 className="text-2xl font-bold">Gossips</h1>
      </div>
      <div>
        <h1>©️ All copyrights reserved 2024.</h1>
      </div>
    </footer>
  );
}
