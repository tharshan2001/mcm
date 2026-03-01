import { sequelize } from "../config/db.js";
import { Op } from "sequelize";          
import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Order from "../models/Order.js";
import Coupon from "../models/Coupon.js";
import Transaction from "../models/Transaction.js";
import Product from "../models/Product.js";

/** PLACE ORDER */
export const placeOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { shipping_address, payment_method, coupon_code } = req.body;
    const user_id = req.user.user_id;

    // 1. Get user's cart (only items with qty > 0)
    const cart = await Cart.findOne({
      where: { user_id },
      include: {
        model: CartItem,
        as: "items",
        where: { quantity: { [Op.gt]: 0 } },
        required: false,
        include: Product,
      },
      transaction: t,
    });

    if (!cart || !cart.items || cart.items.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Calculate total price
    let total_price = cart.items.reduce((sum, item) => sum + Number(item.price), 0);

    let appliedCoupon = null;

    // 3. Apply coupon if provided
    if (coupon_code) {
      appliedCoupon = await Coupon.findOne({
        where: {
          coupon_code,
          status: "active",
          expiration_date: { [Op.gte]: new Date() }, // ✅ FIX
        },
        transaction: t,
      });

      if (!appliedCoupon) {
        await t.rollback();
        return res.status(400).json({ message: "Invalid or expired coupon" });
      }

      // Optional: minimum cart total check
      if (appliedCoupon.usage_conditions) {
        const minTotal = Number(appliedCoupon.usage_conditions) || 0;
        if (total_price < minTotal) {
          await t.rollback();
          return res.status(400).json({
            message: `Cart total must be at least ${minTotal} to use this coupon`,
          });
        }
      }

      total_price -= Number(appliedCoupon.discount_amount);
      if (total_price < 0) total_price = 0;
    }

    // 4. Create transaction (payment success simulation)
    const transactionRecord = await Transaction.create(
      {
        transaction_status: "success",
        amount: total_price,
        transaction_date: new Date(),
        transaction_type: payment_method,
      },
      { transaction: t }
    );

    // 5. Create order
    const order = await Order.create(
      {
        user_id,
        order_date: new Date(),
        order_status: "pending",
        total_price,
        payment_status: "paid",
        shipping_address,
      },
      { transaction: t }
    );

    // 6. Increment coupon usage
    if (appliedCoupon) {
      appliedCoupon.usage_count += 1;
      await appliedCoupon.save({ transaction: t });
    }

    // 7. Clear cart items (keep rows, set qty = 0)
    for (const item of cart.items) {
      item.quantity = 0;
      item.price = 0;
      await item.save({ transaction: t });
    }

    // 8. Reset cart total
    cart.total_price = 0;
    await cart.save({ transaction: t });

    await t.commit();

    res.status(201).json({
      message: "Order placed successfully",
      order,
      transaction: transactionRecord,
      appliedCoupon,
    });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};