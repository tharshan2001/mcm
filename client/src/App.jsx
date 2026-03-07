import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./page/HomePage";
import ShopPage from "./components/ShopPage";
import ProductDetail from "./components/ProductDetail"
import Navbar from "./components/Navbar";
import Account from "./components/Account";
import { Toaster } from "react-hot-toast";
import MaterialsPage from "./page/MaterialsPage";
import About from "./components/About";
import Sidebar from "./components/Sidebar";

function App() {
  const location = useLocation();

  // hide navbar for admin routes
  const hideNavbar = location.pathname.startsWith("/admin");

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
            fontFamily:
              "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: "14px",
            padding: "12px 20px",
          },
          duration: 3000,
          position: "top-center",
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} /> {/* updated route */}
        <Route path="/shop/:slug" element={<ProductDetail />} /> 
        <Route path="/account" element={<Account />} />
        <Route path="/material" element={<MaterialsPage />} />
        <Route path="/about" element={<About />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <Sidebar>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </Sidebar>
          }
        />
      </Routes>
    </div>
  );
}

export default App;