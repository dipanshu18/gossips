import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-base-200 shadow-sm sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-8">
        <div className="navbar-start">
          <Link to={user ? "/home" : "/"} className="btn btn-ghost text-xl">
            Gossips
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {user && (
            <ul>
              <li className="menu text-sm font-semibold">
                <Link to={"/explore"}>Explore</Link>
              </li>
            </ul>
          )}
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end mt-2">
              <div
                tabIndex={0}
                // biome-ignore lint/a11y/useSemanticElements: <explanation>
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"} className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
