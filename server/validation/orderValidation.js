import Joi from "joi";

// Place order validation
export const placeOrderSchema = Joi.object({
  shipping_address: Joi.string().min(10).max(500).required().messages({
    "any.required": "Shipping address is required",
    "string.min": "Shipping address must be at least 10 characters",
    "string.max": "Shipping address cannot exceed 500 characters",
  }),
  payment_method: Joi.string().valid("credit_card", "paypal", "cash_on_delivery").required().messages({
    "any.required": "Payment method is required",
    "any.only": "Payment method must be one of credit_card, paypal, or cash_on_delivery",
  }),
  coupon_code: Joi.string().max(50).allow("", null), // optional
});