import Joi from "joi";

// Add product to cart validation
export const addToCartSchema = Joi.object({
  product_id: Joi.number().integer().required().messages({
    "any.required": "Product ID is required",
    "number.base": "Product ID must be a number",
    "number.integer": "Product ID must be an integer",
  }),
});

// Cart item ID param validation
export const cartItemIdParamSchema = Joi.object({
  itemId: Joi.number().integer().required().messages({
    "any.required": "Cart item ID is required",
    "number.base": "Cart item ID must be a number",
    "number.integer": "Cart item ID must be an integer",
  }),
});