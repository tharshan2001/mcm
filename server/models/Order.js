import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./User.js";

const Order = sequelize.define(
  "Order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
      onDelete: "CASCADE",
    },

    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    order_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "placed",
      // placed | shipped | delivered | cancelled
    },

    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "paid",
      // pending | paid | failed | refunded
    },

    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    tracking_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    return_status: {
      type: DataTypes.STRING,
      allowNull: true,
      // requested | approved | rejected | refunded
    },
  },
  {
    tableName: "Order",
    timestamps: false,
  }
);

export default Order;