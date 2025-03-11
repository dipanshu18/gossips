import { Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";

export default function App() {
  return (
    <Routes>
      <Route index path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
