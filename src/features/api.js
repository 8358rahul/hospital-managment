// src/api/api.js
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add auth token if needed
API.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    const token = JSON.parse(user)?.access; 
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
