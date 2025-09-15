import axios from "axios";

const API = axios.create({
  baseURL: "https://saas-notes-app-86t1.onrender.com", // later replace with Vercel backend URL
});

// Add token automatically if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
