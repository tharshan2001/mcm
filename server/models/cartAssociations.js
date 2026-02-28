import Cart from "./Cart.js";
import CartItem from "./CartItem.js";
import Product from "./Product.js";

Cart.hasMany(CartItem, { foreignKey: "cart_id", as: "items" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

Product.hasMany(CartItem, { foreignKey: "product_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });

export { Cart, CartItem };