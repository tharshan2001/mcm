import express from "express";
import ProductCategory from "../models/ProductCategory.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/**
 * CREATE category (ADMIN)
 */
router.post("/", adminAuth, async (req, res) => {
  try {
    const category = await ProductCategory.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET all categories (PUBLIC)
 */
router.get("/", async (req, res) => {
  try {
    const categories = await ProductCategory.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET category by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const category = await ProductCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * UPDATE category (ADMIN)
 */
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const category = await ProductCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await category.update(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE category (ADMIN)
 */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const category = await ProductCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await category.destroy();
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;