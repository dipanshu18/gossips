import FriendCard from "../components/FriendCard";

export default function FindFriends() {
  return (
    <div className="px-5 md:px-0">
      <h1 className="my-5 text-3xl font-bold">Find friends</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array(10)
          .fill("")
          .map((_, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <FriendCard key={idx} />
          ))}
      </div>
    </div>
  );
}
