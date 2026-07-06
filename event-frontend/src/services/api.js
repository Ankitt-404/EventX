// import "dotenv/config"
// dotenv.config({
//     path : "./.env"
// });
import axios from "axios";

const api = axios.create({
  // baseURL: "https://event-x-tau.vercel.app",
  baseURL: import.meta.env.VITE_RENDER_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;