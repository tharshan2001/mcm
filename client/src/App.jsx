import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./page/HomePage";
import ShopPage from "./components/ShopPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop-all" element={<ShopPage />} />
      </Routes>
    </div>
  );
}

export default App;
