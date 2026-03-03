import Joi from "joi";

// CREATE product validation (Admin)
export const createProductSchema = Joi.object({
  product_name: Joi.string().min(3).max(100).required(),
  product_description: Joi.string().min(10).max(1000).required(),
  price: Joi.number().precision(2).positive().required(),
  stock: Joi.number().integer().min(0).required(),
  category_id: Joi.number().integer().required(),
  images: Joi.array().items(Joi.string().uri()).optional(),
});

// UPDATE product validation (Admin)
export const updateProductSchema = Joi.object({
  product_name: Joi.string().min(3).max(100),
  product_description: Joi.string().min(10).max(1000),
  price: Joi.number().precision(2).positive(),
  stock: Joi.number().integer().min(0),
  category_id: Joi.number().integer(),
  images: Joi.array().items(Joi.string().uri()),
});