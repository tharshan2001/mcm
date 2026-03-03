import Joi from "joi";

// Admin registration validation
export const registerAdminSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone_number: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  permissions: Joi.array().items(Joi.string()).required(),
});

// Admin login validation
export const loginAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});