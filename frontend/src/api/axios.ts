import axios from "axios";
import { type NavigateFunction } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (isTokenExpired()) {
      localStorage.removeItem("token")
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("profileCompleted");
      localStorage.removeItem("tokenExpiry");
    }

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const setupApiInterceptors = (navigate: NavigateFunction) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || isTokenExpired()) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("profileCompleted");
        localStorage.removeItem("tokenExpiry");

        navigate("/");
        console.warn("Unauthorized - token expired");
      }
      return Promise.reject(error);
    }
  );
};

export default api;
