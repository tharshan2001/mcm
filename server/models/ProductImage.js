import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js";

const ProductImage = sequelize.define(
  "ProductImage",
  {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ProductImage",
    timestamps: false,
  }
);

export default ProductImage;