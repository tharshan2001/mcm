import express from "express";
import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} from "../controllers/couponController.js";
import adminAuth from "../middleware/adminAuth.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import {
  createCouponSchema,
  updateCouponSchema,
  couponIdParamSchema,
} from "../validation/couponValidation.js";

const router = express.Router();

// CREATE coupon
router.post("/", adminAuth, validateBody(createCouponSchema), createCoupon);

// GET all coupons
router.get("/", getAllCoupons);

// GET single coupon
router.get("/:id", validateParams(couponIdParamSchema), getCouponById);

// UPDATE coupon
router.put("/:id", adminAuth, validateParams(couponIdParamSchema), validateBody(updateCouponSchema), updateCoupon);

// DELETE coupon
router.delete("/:id", adminAuth, validateParams(couponIdParamSchema), deleteCoupon);

export default router;