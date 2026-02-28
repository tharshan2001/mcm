import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  getCart,
  addToCart,
  incrementCartItem,
  decrementCartItem,
  removeCartItem
} from "../controllers/cartController.js";

const router = express.Router();

// Get the current user's cart
router.get("/", authenticateUser, getCart);

// Add a product to cart (quantity defaults to 1)
router.post("/add", authenticateUser, addToCart);

// Increment cart item quantity by 1
router.post("/increment/:itemId", authenticateUser, incrementCartItem);

// Decrement cart item quantity by 1 (remove if quantity reaches 0)
router.post("/decrement/:itemId", authenticateUser, decrementCartItem);

// Remove a cart item completely
router.delete("/remove/:itemId", authenticateUser, removeCartItem);

export default router;