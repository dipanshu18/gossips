import { Navigate, Route, Routes } from "react-router";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { ProtectedRoutes } from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import OtherUserProfile from "./pages/OtherUserProfile";
import ChatBox from "./pages/ChatBox";
import { useRef } from "react";
import { Navbar } from "./components/Navbar";

function isAuthenticated() {
  const token = localStorage.getItem("token");

  return !!token;
}

export default function App() {
  const chatOpen = useRef(false);

  return (
    <>
      <Navbar chatOpen={chatOpen} />
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

        <Route
          path="/"
          element={<ProtectedRoutes isAuth={isAuthenticated()} />}
        >
          <Route path="/home" element={<Home chatOpen={chatOpen} />} />
          <Route path="/home/:id" element={<ChatBox chatOpen={chatOpen} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<OtherUserProfile />} />
        </Route>
      </Routes>
    </>
  );
}
