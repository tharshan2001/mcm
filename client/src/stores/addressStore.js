import { create } from "zustand";
import api from "../service/api";

export const useAddressStore = create((set) => ({
  addresses: [],
  loading: false,
  error: null,

  // Fetch all addresses
  fetchAddresses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("addresses");
      set({ addresses: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Add new address
  addAddress: async (addressData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("addresses", addressData);
      set((state) => ({
        addresses: [...state.addresses, res.data],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Update address
  updateAddress: async (id, addressData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(`addresses/${id}`, addressData);
      set((state) => ({
        addresses: state.addresses.map((addr) =>
          addr.id === id ? res.data : addr
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Delete address
  deleteAddress: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`addresses/${id}`);
      set((state) => ({
        addresses: state.addresses.filter((addr) => addr.id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Set default address
  setDefaultAddress: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(`addresses/${id}/default`);
      set((state) => ({
        addresses: state.addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        })),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));