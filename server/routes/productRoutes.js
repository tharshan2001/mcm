import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getAllMaterials,
} from "../controllers/productController.js";

const router = express.Router();

// ADMIN routes
router.post("/", adminAuth, createProduct);
router.put("/:slug", adminAuth, updateProduct);
router.delete("/:slug", adminAuth, deleteProduct);

// PUBLIC routes
router.get("/", getAllProducts);
router.get("/materials", getAllMaterials);
router.get("/:slug", getProductBySlug);

export default router;