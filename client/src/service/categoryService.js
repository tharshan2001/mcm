// src/service/categoryService.js
import api from './api';

/**
 * Fetch all categories (optionally paginated or for infinite scroll)
 * @returns {Promise<Array>} - list of categories
 */
export async function fetchCategories() {
  try {
    const response = await api.get('/categories');
    return response.data; // array of category objects
  } catch (error) {
    console.error('[fetchCategories] API error:', error);
    throw error;
  }
}

/**
 * Fetch a single category by id
 * @param {number} categoryId
 * @returns {Promise<Object>} - category object
 */
export async function fetchCategoryById(categoryId) {
  try {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('[fetchCategoryById] API error:', error);
    throw error;
  }
}

/**
 * Create a new category
 * @param {Object} categoryData - { name: string, description: string }
 * @returns {Promise<Object>} - newly created category
 */
export async function createCategory(categoryData) {
  try {
    const response = await api.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('[createCategory] API error:', error);
    throw error;
  }
}

/**
 * Update an existing category
 * @param {number} categoryId
 * @param {Object} categoryData - { name: string, description: string }
 * @returns {Promise<Object>} - updated category
 */
export async function updateCategory(categoryId, categoryData) {
  try {
    const response = await api.put(`/categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('[updateCategory] API error:', error);
    throw error;
  }
}