import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Transaction = sequelize.define(
  "Transaction",
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Transaction",
    timestamps: false,
  }
);

export default Transaction;