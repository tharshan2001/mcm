import { create } from "zustand";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,

  // REGISTER
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API}users/register`, userData, { withCredentials: true });
      // Optionally, automatically fetch user after register
      await get().fetchUser();
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  // LOGIN
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API}users/login`, credentials, { withCredentials: true });
      await get().fetchUser();
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  // FETCH CURRENT USER
  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API}users/me`, { withCredentials: true });
      set({ user: res.data.user, loading: false });
      return res.data.user;
    } catch (err) {
      set({ user: null, loading: false });
      return null;
    }
  },

  // LOGOUT
  logout: async () => {
    set({ loading: true });
    try {
      await axios.post(`${API}users/logout`, {}, { withCredentials: true });
      set({ user: null, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  // CLEAR ERROR
  clearError: () => set({ error: null }),
}));