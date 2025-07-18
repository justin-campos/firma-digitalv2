import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];
      if (token) {
        if (config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
