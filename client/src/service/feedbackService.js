// src/service/feedbackService.js
import api from './api';

/**
 * Submit feedback for a product
 * @param {Object} feedbackData - The feedback data
 * @param {number} feedbackData.productId - ID of the product
 * @param {number} feedbackData.rating - Rating (1-5)
 * @param {string} feedbackData.comments - User comments
 * @returns {Promise<Object>} API response
 */
export const submitFeedback = async ({ productId, rating, comments }) => {
  try {
    const response = await api.post('/feedback/submit', {
      productId,
      rating,
      comments,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    throw error;
  }
};


/**
 * Fetch feedback for a specific product by ID
 * @param {number|string} productId - ID of the product
 * @returns {Promise<Array>} - Array of feedback objects
 */
export const getFeedbackByProduct = async (productId) => {
  try {
    const response = await api.get(`feedback/product/${productId}`);
    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch feedback:", error);
    throw error;
  }
};