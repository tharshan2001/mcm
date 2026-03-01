import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Order from "./Order.js";
import Product from "./Product.js";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    order_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "order_id",
      },
      onDelete: "CASCADE",
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "product_id",
      },
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      // product price at time of order
    },
  },
  {
    tableName: "OrderItem",
    timestamps: false,
  }
);

export default OrderItem;