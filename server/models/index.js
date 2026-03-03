import Product from "./Product.js";
import ProductImage from "./ProductImage.js";
import ProductCategory from "./ProductCategory.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";

/* ----------------------
   PRODUCT ↔ CATEGORY
---------------------- */
Product.belongsTo(ProductCategory, {
  foreignKey: "category_id",
  as: "category",
});
ProductCategory.hasMany(Product, {
  foreignKey: "category_id",
});

/* ----------------------
   PRODUCT ↔ IMAGES
---------------------- */
Product.hasMany(ProductImage, {
  foreignKey: "product_id",
  as: "images",
});
ProductImage.belongsTo(Product, {
  foreignKey: "product_id",
});

/* ----------------------
   ORDER ↔ ORDERITEM
---------------------- */
Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  as: "items",
});
OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
});

/* ----------------------
   PRODUCT ↔ ORDERITEM (for trending products)
---------------------- */
Product.hasMany(OrderItem, {
  foreignKey: "product_id",
  as: "order_items",
});
OrderItem.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product", // must match include alias in queries
});

/* ----------------------
   EXPORT ALL MODELS
---------------------- */
export { Product, ProductImage, ProductCategory, Order, OrderItem };