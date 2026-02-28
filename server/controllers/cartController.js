import { Cart, CartItem } from "../models/cartAssociations.js";
import Product from "../models/Product.js";
import { sequelize } from "../config/db.js";
import { Op } from "sequelize";

/** Get user's cart (exclude items with quantity = 0) */
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { user_id: req.user.user_id },
      include: {
        model: CartItem,
        as: "items",
        where: { quantity: { [Op.gt]: 0 } }, // only items with quantity > 0
        required: false, // allows cart to be returned even if no items
        include: Product,
      },
    });

    if (!cart) return res.json({ items: [], total_price: 0 });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** Add product to cart (default quantity = 1) */
export const addToCart = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { product_id } = req.body;
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ where: { user_id: req.user.user_id }, transaction: t });
    if (!cart) cart = await Cart.create({ user_id: req.user.user_id }, { transaction: t });

    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.cart_id, product_id },
      transaction: t,
    });

    if (cartItem) {
      cartItem.quantity += 1;
      cartItem.price = cartItem.quantity * product.price;
      await cartItem.save({ transaction: t });
    } else {
      cartItem = await CartItem.create(
        {
          cart_id: cart.cart_id,
          product_id,
          quantity: 1,
          price: product.price,
        },
        { transaction: t }
      );
    }

    // Update total price
    const totalPrice = await CartItem.sum("price", {
      where: { cart_id: cart.cart_id, quantity: { [Op.gt]: 0 } },
      transaction: t,
    });
    cart.total_price = totalPrice || 0;
    await cart.save({ transaction: t });

    await t.commit();
    res.json({ message: "Item added to cart", cart });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

/** Increment cart item by 1 */
export const incrementCartItem = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const cartItem = await CartItem.findByPk(req.params.itemId, { transaction: t });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    const product = await Product.findByPk(cartItem.product_id);
    cartItem.quantity += 1;
    cartItem.price = cartItem.quantity * product.price;
    await cartItem.save({ transaction: t });

    const cart = await Cart.findByPk(cartItem.cart_id);
    const totalPrice = await CartItem.sum("price", {
      where: { cart_id: cart.cart_id, quantity: { [Op.gt]: 0 } },
      transaction: t,
    });
    cart.total_price = totalPrice || 0;
    await cart.save({ transaction: t });

    await t.commit();
    res.json({ message: "Item quantity increased", cart });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

/** Decrement cart item by 1 (set quantity to 0, do not delete) */
export const decrementCartItem = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const cartItem = await CartItem.findByPk(req.params.itemId, { transaction: t });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    const product = await Product.findByPk(cartItem.product_id);
    cartItem.quantity -= 1;

    if (cartItem.quantity <= 0) {
      cartItem.quantity = 0;
      cartItem.price = 0;
    } else {
      cartItem.price = cartItem.quantity * product.price;
    }
    await cartItem.save({ transaction: t });

    const cart = await Cart.findByPk(cartItem.cart_id);
    const totalPrice = await CartItem.sum("price", {
      where: { cart_id: cart.cart_id, quantity: { [Op.gt]: 0 } },
      transaction: t,
    });
    cart.total_price = totalPrice || 0;
    await cart.save({ transaction: t });

    await t.commit();
    res.json({ message: "Item quantity decreased", cart });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

/** Remove cart item (set quantity and price to 0, keep item) */
export const removeCartItem = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const cartItem = await CartItem.findByPk(req.params.itemId, { transaction: t });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    cartItem.quantity = 0;
    cartItem.price = 0;
    await cartItem.save({ transaction: t });

    const cart = await Cart.findByPk(cartItem.cart_id);
    const totalPrice = await CartItem.sum("price", {
      where: { cart_id: cart.cart_id, quantity: { [Op.gt]: 0 } },
      transaction: t,
    });
    cart.total_price = totalPrice || 0;
    await cart.save({ transaction: t });

    await t.commit();
    res.json({ message: "Cart item cleared", cart });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};