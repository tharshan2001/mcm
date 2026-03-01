import Order from "./Order.js";
import OrderItem from "./OrderItem.js";

Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  as: "items",
});

OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
});