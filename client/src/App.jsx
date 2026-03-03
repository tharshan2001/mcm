import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import ShopPage from "./components/ShopPage";
import Navbar from "./components/Navbar";
import Account from "./components/Account";
import { Toaster } from "react-hot-toast";
import MaterialsPage from "./page/MaterialsPage";
import About from "./components/About";

function App() {
  return (
    <div>
      <Navbar />

      <Toaster
        containerStyle={{
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        toastOptions={{
          // Default styling for all toasts
          style: {
            borderRadius: "8px",
            background: "#111",
            color: "#fff",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: "14px",
            padding: "12px 20px",
          },
          duration: 3000, // auto dismiss after 3s
          position: "top-center",
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop-all" element={<ShopPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/material" element={<MaterialsPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
