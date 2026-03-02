// src/main.js or wherever you want to fetch products
import api from "./service/api";

async function fetchAllProducts() {
  try {
    const response = await api.get("products"); // GET http://localhost:8090/api/products
    const products = response.data; // Axios wraps the response in .data
    console.log("All products:", products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}

// Call the function
fetchAllProducts();
