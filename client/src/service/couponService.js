import api from "../service/api";

export const fetchPublicCoupons = async () => {
  const response = await api.get("/coupons/public");
  return response.data;
};

export const fetchCoupons = async () => {
  const response = await api.get("/coupons");
  return response.data;
};

export const fetchCouponById = async (id) => {
  const response = await api.get(`/coupons/${id}`);
  return response.data;
};

export const createCoupon = async (couponData) => {
  const response = await api.post("/coupons/create", couponData);
  return response.data;
};

export const updateCoupon = async (id, couponData) => {
  const response = await api.put(`/coupons/${id}`, couponData);
  return response.data;
};

export const deleteCoupon = async (id) => {
  const response = await api.delete(`/coupons/${id}`);
  return response.data;
};

export const validateCoupon = async (code) => {
  const response = await api.get("/coupons/public");
  const coupons = response.data;
  const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
  
  if (!coupon) {
    throw new Error("Invalid coupon code");
  }
  
  if (!coupon.active) {
    throw new Error("This coupon is no longer active");
  }
  
  if (coupon.maxUsage && coupon.usedCount >= coupon.maxUsage) {
    throw new Error("This coupon has reached its usage limit");
  }
  
  if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
    throw new Error("This coupon has expired");
  }
  
  return coupon;
};
