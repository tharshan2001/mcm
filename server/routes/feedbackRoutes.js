import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbacksByProduct,
  deleteFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

// Create feedback (user)
router.post("/", authenticateUser, createFeedback);

// Get all feedbacks
router.get("/", getAllFeedbacks);

// Get feedbacks for a product
router.get("/product/:productId", getFeedbacksByProduct);

// Delete feedback (admin only)
router.delete("/:id", authenticateUser, deleteFeedback);

export default router;
