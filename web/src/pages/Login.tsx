import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants/api";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.replace("/home");
    }
  }, []);

  async function loginWithEmailPassword(credentials: {
    email: string;
    password: string;
  }) {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = await response.data;
        localStorage.setItem("token", data.accessToken);
        toast.success("Credentials verified...");
        return navigate("/home", { replace: true });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = await error.response?.data.message;
        return toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }

  async function loginWithGoogle() {
    setLoading(true);
    window.open(`${BASE_URL}/auth/login/google`, "_self");
  }

  return (
    <div className="hero mt-10">
      <div className="hero-content flex-col">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Welcome back ☺️</h1>
        </div>

        <div className="card bg-base-200 w-full min-w-lg shrink-0 shadow-lg">
          <div className="card-body">
            <fieldset className="fieldset gap-3">
              <div className="space-y-1">
                <label className="fieldset-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  value={credentials.email}
                />
              </div>

              <div className="space-y-1">
                <label className="fieldset-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  value={credentials.password}
                />
              </div>

              <div>
                <Link to={"#"} className="link link-hover">
                  Forgot password?
                </Link>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  loginWithEmailPassword(credentials);
                }}
                disabled={
                  loading || !credentials.email || !credentials.password
                }
                type="submit"
                className="btn btn-neutral"
              >
                {loading ? "Submitting..." : "Login"}
              </button>

              <p className="my-2 text-center text-lg font-extrabold">or</p>

              <div>
                <button
                  type="button"
                  disabled={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    loginWithGoogle();
                  }}
                  className="btn btn-neutral w-full"
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      <FcGoogle />
                      Continue with Google
                    </>
                  )}
                </button>
              </div>

              <div className="mt-2">
                <p>
                  Don't have an account?{" "}
                  <Link to={"/signup"} className="link font-bold">
                    Signup
                  </Link>
                </p>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}
