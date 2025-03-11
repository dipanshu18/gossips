export default function FriendCard() {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <img
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <h1 className="card-title">Name name</h1>

        <button type="button" className="btn btn-primary">
          Follow
        </button>
      </div>
    </div>
  );
}
