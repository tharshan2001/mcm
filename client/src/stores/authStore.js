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
  hasFetchedUser: false, // track if fetchUser has completed
  error: null,

  // AUTH MODAL STATE
  isAuthOpen: false,
  showLogin: true,

  openLogin: () => set({ isAuthOpen: true, showLogin: true }),
  openSignup: () => set({ isAuthOpen: true, showLogin: false }),
  closeAuth: () => set({ isAuthOpen: false }),

  // REGISTER
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const res = await API.post("/auth/register", userData);
      set({ user: res.data, loading: false, isAuthOpen: false });
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
      const res = await API.post("/auth/login", credentials);
      set({ user: res.data, loading: false, isAuthOpen: false });
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
      const res = await API.get("/auth/me");
      set({ user: res.data, loading: false, hasFetchedUser: true });
      return res.data;
    } catch (err) {
      set({ user: null, loading: false, hasFetchedUser: true });
      return null;
    }
  },

  // LOGOUT
  logout: async () => {
    set({ loading: true });
    try {
      await API.post("/auth/logout");
      set({ user: null, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  clearError: () => set({ error: null }),

  // SEND OTP (Step 1 - sends full registration data for OTP generation)
  sendOtp: async (email, fullName, password) => {
    set({ loading: true, error: null });
    try {
      await API.post("/auth/register/send-otp", { 
        fullName, 
        email, 
        password,
        roleId: 2 
      });
      set({ loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  // VERIFY OTP & REGISTER (Step 2 - creates user after OTP verification)
  verifyOtp: async (email, otpCode) => {
    set({ loading: true, error: null });
    try {
      const res = await API.post("/auth/register/verify", { 
        email, 
        otpCode 
      });
      set({ user: res.data, loading: false, isAuthOpen: false });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },
}));