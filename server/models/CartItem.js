import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Cart from "./Cart.js";
import Product from "./Product.js";

const CartItem = sequelize.define(
  "CartItem",
  {
    cart_item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cart_id: { type: DataTypes.INTEGER, references: { model: Cart, key: "cart_id" } },
    product_id: { type: DataTypes.INTEGER, references: { model: Product, key: "product_id" } },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  },
  {
    tableName: "CartItem",
    timestamps: false,
  }
);

export default CartItem;