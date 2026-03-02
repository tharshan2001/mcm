// src/service/api.js
import axios from 'axios';

// Vite env variable (must start with VITE_)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090/api/';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // automatically send cookies/credentials
});

// Optional: Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;