import { create } from "zustand";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8090/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // REGISTER
  register: async (userData) => {
    set({ loading: true, error: null });

    try {
      const res = await API.post("/auth/register", userData);

      set({
        user: res.data,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      throw err;
    }
  },

  // LOGIN
  login: async (credentials) => {
    set({ loading: true, error: null });

    try {
      const res = await API.post("/auth/login", credentials);

      set({
        user: res.data,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      throw err;
    }
  },

  // FETCH CURRENT USER
  fetchUser: async () => {
    set({ loading: true });

    try {
      const res = await API.get("/auth/me");

      set({
        user: res.data,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        user: null,
        loading: false,
      });

      return null;
    }
  },

  // LOGOUT
  logout: async () => {
    set({ loading: true });

    try {
      await API.post("/auth/logout");

      set({
        user: null,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));