import Coupon from "../models/Coupon.js";
import { Op } from "sequelize";

/** CREATE a new coupon (Admin) */
export const createCoupon = async (req, res) => {
  try {
    const { coupon_code, discount_amount, expiration_date, usage_conditions, coupon_type } = req.body;

    const existing = await Coupon.findOne({ where: { coupon_code } });
    if (existing) return res.status(400).json({ message: "Coupon code already exists" });

    const coupon = await Coupon.create({
      coupon_code,
      discount_amount,
      expiration_date,
      usage_conditions,
      coupon_type,
      admin_id: req.admin.admin_id
    });

    res.status(201).json({ message: "Coupon created", coupon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** GET all coupons */
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** GET single coupon */
export const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** UPDATE coupon (Admin) */
export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    await coupon.update(req.body);
    res.json({ message: "Coupon updated", coupon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** DELETE coupon (Admin) */
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    await coupon.destroy();
    res.json({ message: "Coupon deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** APPLY coupon */
export const applyCoupon = async (req, res) => {
  try {
    const { coupon_code, cart_total } = req.body;

    if (!coupon_code) return res.status(400).json({ message: "Coupon code is required" });

    const coupon = await Coupon.findOne({
      where: {
        coupon_code,
        status: "active",
        expiration_date: { [Op.gte]: new Date() }
      }
    });

    if (!coupon) return res.status(404).json({ message: "Coupon not valid or expired" });

    // Optional: check usage conditions (min cart total, max usage, etc.)
    if (coupon.usage_conditions) {
      const minTotal = parseFloat(coupon.usage_conditions) || 0;
      if (cart_total < minTotal) {
        return res.status(400).json({ message: `Cart total must be at least ${minTotal} to use this coupon` });
      }
    }

    res.json({
      message: "Coupon applied successfully",
      coupon_id: coupon.coupon_id,
      discount_amount: coupon.discount_amount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};