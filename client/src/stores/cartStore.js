// src/store/cartStore.js
import { create } from "zustand";
import api from "../service/api";

export const useCartStore = create((set) => ({
  cart: null,
  loading: false,
  error: null,

  // Fetch cart for logged-in user
  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`cart/view`);
      set({ cart: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Add item to cart
  addItem: async (productId, quantity) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post(`cart/add`, { productId, quantity });
      set({ cart: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Increase item quantity by 1
  increaseItem: async (productId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post(`cart/increase/${productId}`);
      set({ cart: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Decrease item quantity by 1
  decreaseItem: async (productId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post(`cart/decrease/${productId}`);
      set({ cart: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Checkout cart
  checkout: async () => {
    set({ loading: true, error: null });
    try {
      await api.post(`cart/checkout`);
      set({ cart: null, loading: false }); // Clear cart after checkout
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));