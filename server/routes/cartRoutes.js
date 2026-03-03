import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  getCart,
  addToCart,
  incrementCartItem,
  decrementCartItem,
  removeCartItem
} from "../controllers/cartController.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import { addToCartSchema, cartItemIdParamSchema } from "../validation/cartValidation.js";

const router = express.Router();

// Get user's cart
router.get("/", authenticateUser, getCart);

// Add a product to cart
router.post("/add", authenticateUser, validateBody(addToCartSchema), addToCart);

// Increment cart item quantity
router.post("/increment/:itemId", authenticateUser, validateParams(cartItemIdParamSchema), incrementCartItem);

// Decrement cart item quantity
router.post("/decrement/:itemId", authenticateUser, validateParams(cartItemIdParamSchema), decrementCartItem);

// Remove/clear a cart item
router.delete("/remove/:itemId", authenticateUser, validateParams(cartItemIdParamSchema), removeCartItem);

export default router;