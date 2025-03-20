import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { BASE_URL } from "../constants/api";
import type { IUser } from "../../types";

export function Navbar() {
  const [user, setUser] = useState<IUser>();

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/me`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = await response.data.user;
        setUser(data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = await error.response?.data.message;
        return toast.error(errorMessage);
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUser();
    }
  }, [getUser]);

  async function handleLogout() {
    try {
      const response = await axios.get(`${BASE_URL}/auth/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        toast.success("Logged out...");
        window.location.replace("/");
        return;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = await error.response?.data.message;
        return toast.error(errorMessage);
      }
    }
  }

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
                  <img alt="Tailwind CSS Navbar component" src={user.image} />
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
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
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
