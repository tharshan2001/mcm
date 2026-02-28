import express from "express";
import ProductImage from "../models/ProductImage.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/**
 * ADD image to product (ADMIN)
 */
router.post("/", adminAuth, async (req, res) => {
  try {
    const image = await ProductImage.create(req.body);
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET images by product_id
 */
router.get("/product/:product_id", async (req, res) => {
  try {
    const images = await ProductImage.findAll({
      where: { product_id: req.params.product_id },
    });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE image (ADMIN)
 */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const image = await ProductImage.findByPk(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    await image.destroy();
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;