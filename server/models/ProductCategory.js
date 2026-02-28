import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js";

const ProductCategory = sequelize.define(
  "ProductCategory",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "ProductCategory",
    timestamps: false,
  }
);

export default ProductCategory;