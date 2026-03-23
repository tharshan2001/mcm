import api from "../service/api";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

export const getDashboardSales = async () => {
  const response = await api.get("/dashboard/sales");
  return response.data;
};

export const getRevenueChart = async (days = 30) => {
  const response = await api.get("/dashboard/revenue-chart", { params: { days } });
  return response.data;
};

export const getOrdersChart = async (days = 30) => {
  const response = await api.get("/dashboard/orders-chart", { params: { days } });
  return response.data;
};

export const getTopProducts = async (limit = 5) => {
  const response = await api.get("/dashboard/top-products", { params: { limit } });
  return response.data;
};

export const getRecentOrders = async (limit = 10) => {
  const response = await api.get("/dashboard/recent-orders", { params: { limit } });
  return response.data;
};

export const getTopCategories = async (limit = 5) => {
  const response = await api.get("/dashboard/top-categories", { params: { limit } });
  return response.data;
};
