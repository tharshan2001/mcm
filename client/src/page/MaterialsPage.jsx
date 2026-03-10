// src/pages/MaterialsPage.jsx
import React, { useEffect, useState } from "react";
import api from "../service/api";
import ProductGrid from "../components/product/ProductGrid";

const MaterialsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllMaterials = async () => {
    try {
      const response = await api.get("products/materials");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMaterials();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading materials...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-16 ">
      <h2 className="text-3xl font-serif mb-12 text-center">
        Materials Collection
      </h2>

      <ProductGrid products={products} />
    </div>
  );
};

export default MaterialsPage;