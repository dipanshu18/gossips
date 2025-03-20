import { Navigate, Outlet } from "react-router";

export function ProtectedRoutes({ isAuth }: { isAuth: boolean }) {
  return isAuth ? (
    <div className="md:px-5">
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
