import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000, // 80 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// =======================
// Request Interceptor
// =======================
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token"); // get token from localStorage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // attach token to request
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =======================
// Response Interceptor
// =======================
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // return the response if successful
  },
  (error) => {
    // Handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized → redirect to login
        window.location.href = "/";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
