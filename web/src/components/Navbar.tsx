import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";

import type { IUser } from "../../types";
import { API } from "../constants/api";
import { cn } from "../lib/utils";

export function Navbar({
  chatOpen,
}: {
  chatOpen: React.MutableRefObject<boolean>;
}) {
  const [user, setUser] = useState<IUser>();

  const getUser = useCallback(async () => {
    try {
      const response = await API.get(
        `${import.meta.env.VITE_API_URL}/user/me`,
        {
          withCredentials: true,
        }
      );

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
      const response = await API.get(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          withCredentials: true,
        }
      );

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
      <div className="navbar px-5">
        <div className="navbar-start">
          <Link
            to={user ? "/home" : "/"}
            onClick={() => {
              chatOpen.current = false;
            }}
            className="btn btn-ghost text-xl"
          >
            Gossips
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          {user && (
            <ul>
              <li className="menu text-sm font-semibold">
                <Link
                  to={"/explore"}
                  onClick={() => {
                    chatOpen.current = false;
                  }}
                >
                  Explore
                </Link>
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
                className={cn(
                  "btn btn-ghost btn-circle avatar",
                  !user.image && "bg-neutral-700"
                )}
              >
                {user.image ? (
                  <div className="w-10 rounded-full">
                    <img
                      alt={`${user.name} profile`}
                      src={
                        user.image.startsWith("https://")
                          ? user.image
                          : `https://res.cloudinary.com/${
                              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                            }/image/upload/${user.image}`
                      }
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <h1 className="my-auto">
                    {user.name.split(" ").map((word) => `${word[0]}`)}
                  </h1>
                )}
              </div>
              <ul
                // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li className="block md:hidden">
                  <Link
                    to={"/explore"}
                    onClick={() => {
                      chatOpen.current = false;
                    }}
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/profile"}
                    className="justify-between"
                    onClick={() => {
                      chatOpen.current = false;
                    }}
                  >
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
