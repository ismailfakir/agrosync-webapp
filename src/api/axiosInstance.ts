import axios, { AxiosError, type AxiosInstance } from "axios";

// You can also use import.meta.env.VITE_API_URL in Vite projects
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // change to true if using cookies/auth
});

// ────────────────────────────────────────────────
//  Request Interceptor  (very common pattern)
// ────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or use your auth store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ────────────────────────────────────────────────
//  Response Interceptor  (centralized error handling)
// ────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // You can show toast/notification here
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // logout user, redirect to login, etc.
          console.warn("Unauthorized — token expired?");
          // Example: authStore.logout();
          break;
        case 403:
          console.warn("Forbidden");
          break;
        case 429:
          console.warn("Rate limit exceeded");
          break;
        default:
          console.error("API Error:", error.response?.data);
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
