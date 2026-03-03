import Joi from "joi";

// CREATE coupon validation (Admin)
export const createCouponSchema = Joi.object({
  coupon_code: Joi.string().min(3).max(50).required(),
  discount_amount: Joi.number().precision(2).positive().required(),
  expiration_date: Joi.date().required(),
  usage_conditions: Joi.string().allow("", null),
  coupon_type: Joi.string().valid("fixed", "percentage").required(),
});

// UPDATE coupon validation (Admin)
export const updateCouponSchema = Joi.object({
  coupon_code: Joi.string().min(3).max(50),
  discount_amount: Joi.number().precision(2).positive(),
  expiration_date: Joi.date(),
  usage_conditions: Joi.string().allow("", null),
  status: Joi.string().valid("active", "inactive"),
  coupon_type: Joi.string().valid("fixed", "percentage"),
});

// APPLY coupon validation (User)
export const applyCouponSchema = Joi.object({
  coupon_code: Joi.string().required(),
  cart_total: Joi.number().precision(2).positive().required(),
});

// Coupon ID param validation
export const couponIdParamSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "any.required": "Coupon ID is required",
    "number.base": "Coupon ID must be a number",
    "number.integer": "Coupon ID must be an integer",
  }),
});