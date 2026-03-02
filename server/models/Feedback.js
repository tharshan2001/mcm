import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./User.js";
import Product from "./Product.js";

const Feedback = sequelize.define(
  "Feedback",
  {
    feedback_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: { model: Product, key: "product_id" }
    },
    user_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: { model: User, key: "user_id" }
    },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comments: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "Feedback",
    timestamps: false,
  }
);

export default Feedback;