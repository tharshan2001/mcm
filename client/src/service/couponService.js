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
  const coupons = await fetchCoupons();
  const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
  
  if (!coupon) {
    throw new Error("Invalid coupon code");
  }
  
  return coupon;
};
