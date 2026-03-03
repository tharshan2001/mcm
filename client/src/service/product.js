// src/service/product.js
import api from "./service/api";

// Fetch ALL products
async function fetchAllProducts() {
  try {
    const response = await api.get("products");
    console.log("All products:", response.data);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}

// Fetch ONLY materials
async function fetchAllMaterials() {
  try {
    const response = await api.get("products/getAllMaterials");
    console.log("Materials:", response.data);
  } catch (error) {
    console.error("Failed to fetch materials:", error);
  }
}

