import express from "express";
import { createCoupon, getAllCoupons, getCouponById, updateCoupon, deleteCoupon } from "../controllers/couponController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/", adminAuth, createCoupon);
router.get("/", getAllCoupons);
router.get("/:id", getCouponById);
router.put("/:id", adminAuth, updateCoupon);
router.delete("/:id", adminAuth, deleteCoupon);

export default router;