import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Product from "./Product.js";

/* Order → OrderItems */
Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  as: "items",
});
OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
});

/* Product → OrderItems (for trending products) */
Product.hasMany(OrderItem, {
  foreignKey: "product_id",
  as: "order_items",
});
OrderItem.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product", // ✅ alias must match include in query
});