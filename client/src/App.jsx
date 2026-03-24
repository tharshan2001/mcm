import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./page/HomePage";
import ShopPage from "./components/product/ShopPage";
import Navbar from "./components/Navbar";
import Account from "./components/Account";
import { Toaster } from "react-hot-toast";
import BlogPage from "./page/BlogPage";
import About from "./components/About";
import DashboardLayout from "./layout/DashboardLayout";
import ProductCreate from "./components/admin/ProductCreate";
import { useAuthStore } from "./stores/authStore";
import AdminRoute from "./routes/AdminRoute";
import ProductList from "./components/admin/ProductList";
import OrderDetail from "./components/order/OrderDetail";
import OrderList from "./components/admin/OrderList";
import CustomerList from "./components/admin/CustomerList";
import CategoryList from "./components/admin/CategoryList";
import OrderDetailsPage from "./components/admin/OrderDetailsPage";
import ProductPage from "./page/ProductPage";
import CouponList from "./components/admin/CouponList";
import Dashboard from "./components/admin/Dashboard";

function App() {
  const location = useLocation();
  const { fetchUser } = useAuthStore();

  // hide navbar for admin routes
  const hideNavbar = location.pathname.startsWith("/admin");

  // fetch current user on app load
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Toaster
        containerStyle={{
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#111",
            color: "#fff",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: "14px",
            padding: "12px 20px",
          },
          duration: 3000,
          position: "top-center",
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:slug" element={<ProductPage/>} />
        <Route path="/account" element={<Account />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/orders/:id" element={<OrderDetail />} />

        {/* Admin Protected Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="product" element={<ProductCreate />} />
            <Route path="category" element={<CategoryList/>} />
            <Route path="order-list" element={<OrderList />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="coupons" element={<CouponList />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="orders/:orderId" element={<OrderDetailsPage/>} />


            {/* Add more admin routes here */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
