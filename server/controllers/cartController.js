import { Cart, CartItem } from "../models/cartAssociations.js";
import Product from "../models/Product.js";
import { sequelize } from "../config/db.js";

/** Get user's cart */
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { user_id: req.user.user_id },
      include: { model: CartItem, as: "items", include: Product },
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

    // Get or create user's cart automatically
    let cart = await Cart.findOne({ where: { user_id: req.user.user_id }, transaction: t });
    if (!cart) cart = await Cart.create({ user_id: req.user.user_id }, { transaction: t });

    // Get or create cart item
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
    cart.total_price = await CartItem.sum("price", { where: { cart_id: cart.cart_id }, transaction: t });
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
    cart.total_price = await CartItem.sum("price", { where: { cart_id: cart.cart_id }, transaction: t });
    await cart.save({ transaction: t });

    await t.commit();
    res.json({ message: "Item quantity increased", cart });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

/** Decrement cart item by 1 (remove if <= 0) */
export const decrementCartItem = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const cartItem = await CartItem.findByPk(req.params.itemId, { transaction: t });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    const product = await Product.findByPk(cartItem.product_id);
    cartItem.quantity -= 1;

    if (cartItem.quantity <= 0) {
      await cartItem.destroy({ transaction: t });
    } else {
      cartItem.price = cartItem.quantity * product.price;
      await cartItem.save({ transaction: t });
    }

    const cart = await Cart.findByPk(cartItem.cart_id);
    cart.total_price = (await CartItem.sum("price", { where: { cart_id: cart.cart_id }, transaction: t })) || 0;
    await cart.save({ transaction: t });

    await t.commit();
    res.json({ message: "Item quantity decreased", cart });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

/** Remove cart item completely */
export const removeCartItem = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const cartItem = await CartItem.findByPk(req.params.itemId, { transaction: t });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    await cartItem.destroy({ transaction: t });

    const cart = await Cart.findByPk(cartItem.cart_id);
    cart.total_price = (await CartItem.sum("price", { where: { cart_id: cart.cart_id }, transaction: t })) || 0;
    await cart.save({ transaction: t });

    await t.commit();
    res.json({ message: "Cart item removed", cart });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};