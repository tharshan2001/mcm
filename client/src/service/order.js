// src/service/order.js
import api from "./api";

export const fetchOrdersForScroll = async (cursor = null) => {
  const params = cursor ? { cursor } : {};
  const res = await api.get("orders/scroll", { params });
  console.log("[fetchOrdersForScroll] cursor:", cursor);
  console.log("[fetchOrdersForScroll] response:", res.data);
  return res.data;
};

export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const checkoutOrder = async (addressId, paymentIntentId, couponCode = null) => {
  const payload = { addressId, paymentIntentId };
  if (couponCode) {
    payload.couponCode = couponCode;
  }
  const response = await api.post("/orders/checkout", payload);
  return response.data;
};