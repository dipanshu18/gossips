import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import { Spinner } from "./Spinner";

export function ProtectedRoutes() {
  const { isLoading, user } = useAuth();

  return isLoading ? (
    <div className="hero min-h-screen">
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md mx-auto">
          <Spinner />
        </div>
      </div>
    </div>
  ) : user ? (
    <div className="max-w-7xl mx-auto px-12">
      <Outlet />
    </div>
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{
        redirectUri: window.location.pathname,
      }}
    />
  );
}
