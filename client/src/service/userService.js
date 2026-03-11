// src/service/userService.js
import api from './api';

/**
 * Fetch customers for infinite scroll
 * @param {number|null} cursor - id of last customer from previous page
 * @param {number} limit - number of customers per page
 * @returns {Promise<Array>} - list of customers
 */
export async function fetchCustomersForScroll(cursor = null, limit = 10) {
  try {
    const params = { limit };
    if (cursor) params.cursor = cursor;

    const response = await api.get('/users/customers/scroll', { params });
    return response.data; // array of customer objects
  } catch (error) {
    console.error('[fetchCustomersForScroll] API error:', error);
    throw error;
  }
}

/**
 * Optionally, fetch all customers (not recommended for large datasets)
 */
export async function fetchAllCustomers() {
  try {
    const response = await api.get('/users/customers');
    return response.data;
  } catch (error) {
    console.error('[fetchAllCustomers] API error:', error);
    throw error;
  }
}