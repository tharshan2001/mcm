import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./page/HomePage";
import ShopPage from "./components/ShopPage";
import ProductDetail from "./components/ProductDetail";
import Navbar from "./components/Navbar";
import Account from "./components/Account";
import { Toaster } from "react-hot-toast";
import MaterialsPage from "./page/MaterialsPage";
import About from "./components/About";
import DashboardLayout from "./layout/DashboardLayout";
import ProductCreate from "./components/admin/ProductCreate";
import { useAuthStore } from "./stores/authStore";
import AdminRoute from "./routes/AdminRoute";
import ProductList from "./components/admin/ProductList";
import OrderDetail from "./components/order/OrderDetail";
import OrderList from "./components/admin/OrderList";

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
        <Route path="/shop/:slug" element={<ProductDetail />} />
        <Route path="/account" element={<Account />} />
        <Route path="/material" element={<MaterialsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/orders/:id" element={<OrderDetail />} />

        {/* Admin Protected Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="product" element={<ProductCreate />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="order-list" element={<OrderList />} />
            
            {/* Add more admin routes here */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
