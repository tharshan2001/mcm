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

// (Optional) Get the current user's cart
// You can remove this route if you don't want to expose GET
router.get("/", authenticateUser, getCart);

// Add a product to cart (quantity defaults to 1)
router.post("/add", authenticateUser, addToCart);

// Increment cart item quantity by 1
router.post("/increment/:itemId", authenticateUser, incrementCartItem);

// Decrement cart item quantity by 1 (sets quantity to 0 if it reaches 0)
router.post("/decrement/:itemId", authenticateUser, decrementCartItem);

// Clear a cart item (sets quantity and price to 0, keeps the item)
router.delete("/remove/:itemId", authenticateUser, removeCartItem);

export default router;