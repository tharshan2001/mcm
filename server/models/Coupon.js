import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Admin from "./Admin.js";

const Coupon = sequelize.define(
  "Coupon",
  {
    coupon_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    coupon_code: { type: DataTypes.STRING, allowNull: false, unique: true },
    discount_amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    expiration_date: { type: DataTypes.DATEONLY },
    usage_conditions: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: "active" },
    usage_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    coupon_type: { type: DataTypes.STRING },
    admin_id: { type: DataTypes.INTEGER, references: { model: Admin, key: "admin_id" } },
  },
  {
    tableName: "Coupon",
    timestamps: false,
  }
);

export default Coupon;