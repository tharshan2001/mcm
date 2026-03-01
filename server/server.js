import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB, sequelize } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js" 
import productRoutes from "./routes/productRoutes.js";
import productCategoryRoutes from "./routes/productCategoryRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  credentials: true              // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", productCategoryRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Backend running!");
});

// Sync database and start server
const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true }); // Auto-sync tables
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();