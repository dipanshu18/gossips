import { Navigate, Route, Routes } from "react-router";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { ProtectedRoutes } from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import MobileChatBox from "./pages/MobileChatBox";
import OtherUserProfile from "./pages/OtherUserProfile";

function isAuthenticated() {
  const token = localStorage.getItem("token");

  return !!token;
}

export default function App() {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          isAuthenticated() ? <Navigate to={"home"} replace /> : <Landing />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated() ? <Navigate to={"home"} replace /> : <Login />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated() ? <Navigate to={"home"} replace /> : <Signup />
        }
      />

      <Route path="/" element={<ProtectedRoutes isAuth={isAuthenticated()} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<MobileChatBox />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<OtherUserProfile />} />
      </Route>
    </Routes>
  );
}
