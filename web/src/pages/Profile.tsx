export default function Profile() {
  return (
    <div className="py-5">
      <div className="flex items-center gap-5">
        <img
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt=""
          className="w-36 h-36 rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold">Name name</h1>
          <p className="text-lg font-semibold">Email email</p>
          <button type="button" className="btn">
            Edit profile
          </button>
        </div>
      </div>
      <div className="my-2 w-full">
        <ul className="w-full flex bg-base-200 rounded-box p-5">
          <li className="w-full hover:bg-base-300 p-2 rounded-md">
            <div className="flex gap-1">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              Followers
              <span className="badge badge-xs">99+</span>
            </div>
          </li>
          <li className="w-full">
            <div className="flex gap-1 hover:bg-base-300 p-2 rounded-md">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
              Following
              <span className="badge badge-xs">99+</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
