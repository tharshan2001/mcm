import Joi from "joi";

// Create feedback validation
export const createFeedbackSchema = Joi.object({
  product_id: Joi.number().integer().required().messages({
    "any.required": "Product ID is required",
    "number.base": "Product ID must be a number",
    "number.integer": "Product ID must be an integer",
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "any.required": "Rating is required",
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating cannot exceed 5",
  }),
  comments: Joi.string().max(500).allow("", null),
});

// Validate route param: feedback ID
export const feedbackIdParamSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "any.required": "Feedback ID is required",
    "number.base": "Feedback ID must be a number",
    "number.integer": "Feedback ID must be an integer",
  }),
});

// Validate route param: product ID
export const productIdParamSchema = Joi.object({
  productId: Joi.number().integer().required().messages({
    "any.required": "Product ID is required",
    "number.base": "Product ID must be a number",
    "number.integer": "Product ID must be an integer",
  }),
});