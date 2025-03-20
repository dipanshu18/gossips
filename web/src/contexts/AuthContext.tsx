import { createContext, ReactNode, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants/api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface IAuthContext {
  isAuth: boolean;
  loginWithEmailPassword: (credentials: {
    email: string;
    password: string;
  }) => void;
  loginWithGoogle?: () => void;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(isAuth);
    setIsAuth(!!localStorage.getItem("token"));
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
        localStorage.setItem("token", data);
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

  async function logout() {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/auth/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const message = await response.data.message;
        toast.success(message);
        return navigate("/", { replace: true });
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

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        loading,
        logout,
        loginWithEmailPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
