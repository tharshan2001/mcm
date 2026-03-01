import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

/**
 * PLACE ORDER
 * - Uses cart
 * - Applies coupon if provided
 * - Processes payment internally
 * - Creates order + transaction
 */
router.post("/place", authenticateUser, placeOrder);

export default router;