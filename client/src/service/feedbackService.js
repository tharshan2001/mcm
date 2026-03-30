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

/**
 * Update own feedback
 * @param {number} id - Feedback ID
 * @param {Object} feedbackData - Updated feedback data
 * @param {number} feedbackData.rating - Rating (1-5)
 * @param {string} feedbackData.comments - User comments
 * @returns {Promise<Object>} API response
 */
export const updateFeedback = async (id, { rating, comments }) => {
  try {
    const response = await api.put(`/feedback/${id}`, { rating, comments });
    return response.data;
  } catch (error) {
    console.error("Failed to update feedback:", error);
    throw error;
  }
};

/**
 * Delete own feedback
 * @param {number} id - Feedback ID
 * @returns {Promise<Object>} API response
 */
export const deleteFeedback = async (id) => {
  try {
    const response = await api.delete(`/feedback/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete feedback:", error);
    throw error;
  }
};