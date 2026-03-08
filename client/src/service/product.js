import api from "../service/api";

// Fetch products with optional cursor for infinite scroll
export const fetchProducts = async (cursor = null) => {
  const response = await api.get("/products/scroll", {
    params: cursor ? { cursor } : {},
  });

  const data = Array.isArray(response.data)
    ? response.data
    : response.data.products || [];

  return data;
};

// Delete a product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Toggle archived status
export const toggleArchive = async (id, archived) => {
  const url = `/products/${id}/archive?archived=${archived}`;
  const response = await api.patch(url, null, {
    headers: { "Content-Type": "text/plain" }, // avoids CORS preflight
  });
  return response.data;
};

// Existing product creation
export const createProduct = async (productData, files) => {
  const formData = new FormData();

  const productJson = {
    name: productData.name,
    description: productData.description,
    price: parseFloat(productData.price),
    stockQuantity: parseInt(productData.stockQuantity),
    categoryId: parseInt(productData.categoryId),
    archived: false
  };

  formData.append('data', JSON.stringify(productJson));

  if (files && files.length > 0) {
    files.forEach(file => formData.append('files', file));
  }

  const response = await api.post('/products/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

// Existing product update
export const updateProduct = async (id, productData, files) => {
  const formData = new FormData();

  const productJson = {
    name: productData.name,
    description: productData.description,
    price: parseFloat(productData.price),
    stockQuantity: parseInt(productData.stockQuantity),
    categoryId: parseInt(productData.categoryId),
    archived: productData.archived || false
  };

  formData.append('data', JSON.stringify(productJson));

  if (files && files.length > 0) {
    files.forEach(file => formData.append('files', file));
  }

  const response = await api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};