import Image from "next/image";

export default function SidebarProfile() {
  return (
    <div className="flex md:flex-row items-center gap-2 border w-full py-4 pl-4">
      <div className="w-10 h-10 flex flex-shrink-0">
        <Image
          src={"/logo.png"}
          alt="User profile photo"
          width={100}
          height={100}
          className="object-cover w-full h-full rounded-full border border-white"
        />
      </div>
      <div className="hidden md:flex">
        <h1 className="font-normal">User Full Name</h1>
      </div>
    </div>
  );
}
