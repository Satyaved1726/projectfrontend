import axios from "axios";
import API_BASE_URL from "./config/api";

const instance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Add CORS headers
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
  config.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
  
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log CORS and network errors
    if (error.message === "Network Error") {
      console.error("Network Error - Backend might be down or unreachable");
    }
    if (error.response?.status === 0 || error.code === "ERR_NETWORK") {
      console.error("CORS or Network Connection Error");
    }
    return Promise.reject(error);
  }
);

export default instance;
