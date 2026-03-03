import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbacksByProduct,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import { createFeedbackSchema, feedbackIdParamSchema, productIdParamSchema } from "../validation/feedbackValidation.js";

const router = express.Router();

// Create feedback (user)
router.post("/", authenticateUser, validateBody(createFeedbackSchema), createFeedback);

// Get all feedbacks
router.get("/", getAllFeedbacks);

// Get feedbacks for a product
router.get("/product/:productId", validateParams(productIdParamSchema), getFeedbacksByProduct);

// Delete feedback (admin only)
router.delete("/:id", authenticateUser, validateParams(feedbackIdParamSchema), deleteFeedback);

export default router;