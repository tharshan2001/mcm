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

/**
 * Get customer by ID
 */
export async function getCustomerById(id) {
  try {
    const response = await api.get(`/users/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error('[getCustomerById] API error:', error);
    throw error;
  }
}

/**
 * Update customer
 */
export async function updateCustomer(id, customerData) {
  try {
    const response = await api.put(`/users/customers/${id}`, customerData);
    return response.data;
  } catch (error) {
    console.error('[updateCustomer] API error:', error);
    throw error;
  }
}

/**
 * Delete customer
 */
export async function deleteCustomer(id) {
  try {
    const response = await api.delete(`/users/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error('[deleteCustomer] API error:', error);
    throw error;
  }
}