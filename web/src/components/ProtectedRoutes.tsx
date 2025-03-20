import { Navigate, Outlet } from "react-router";

export function ProtectedRoutes({ isAuth }: { isAuth: boolean }) {
  return isAuth ? (
    <div className="md:max-w-7xl mx-auto px-5 md:px-12">
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
