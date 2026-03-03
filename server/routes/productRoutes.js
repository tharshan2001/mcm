import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProductById,
  archiveProductById,
  getAllMaterials,
} from "../controllers/productController.js";
import { validateBody } from "../middleware/validate.js";
import { createProductSchema, updateProductSchema } from "../validation/productValidation.js";

const router = express.Router();

// ADMIN routes
router.post("/", adminAuth, validateBody(createProductSchema), createProduct);
router.put("/:id", adminAuth, validateBody(updateProductSchema), updateProductById);
router.delete("/:id", adminAuth, archiveProductById); 

// PUBLIC routes
router.get("/", getAllProducts);
router.get("/materials", getAllMaterials);
router.get("/:slug", getProductBySlug);

export default router;