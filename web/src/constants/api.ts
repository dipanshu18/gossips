import axios from "axios";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response);

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    if (status === 403 && data.message === "No access token") {
      try {
        // refresh the access token, then retry the original request
        const response = await TokenRefreshClient.get("/auth/refresh");
        const data = await response.data.accessToken;
        localStorage.setItem("token", data);

        return TokenRefreshClient(config);
      } catch (error) {
        // handle refresh errors by clearing the query cache & redirecting to login
        console.log("ERROR:", error);
        localStorage.removeItem("token");
        window.location.replace("/login");
      }
    }

    // try to refresh the access token behind the scenes
    if (status === 403 && data.message === "Token expired") {
      try {
        // refresh the access token, then retry the original request
        const response = await TokenRefreshClient.get("/auth/refresh");
        const data = await response.data.accessToken;
        localStorage.setItem("token", data);

        return TokenRefreshClient(config);
      } catch (error) {
        // handle refresh errors by clearing the query cache & redirecting to login
        console.log("ERROR:", error);
        localStorage.removeItem("token");
        window.location.replace("/login");
      }
    }

    return Promise.reject({ status, ...data });
  }
);

export { API };
