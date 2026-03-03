import Joi from "joi";

// User registration validation
export const registerUserSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone_number: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
    "string.pattern.base": "Phone number must be 10-15 digits",
  }),
  role_id: Joi.number().integer().required(),
  address: Joi.string().min(10).max(500).required(),
});

// User login validation
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});