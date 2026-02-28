import { Product, ProductImage, ProductCategory } from "../models/index.js";

/** CREATE product with slug */
export const createProduct = async (req, res) => {
  const t = await Product.sequelize.transaction();
  try {
    const { product_name, product_description, price, stock, category_id, images } = req.body;
    const admin_id = req.admin.admin_id;

    const product = await Product.create(
      {
        name: product_name,
        description: product_description,
        price,
        stock_quantity: stock,
        category_id,
        admin_id,
      },
      { transaction: t }
    );

    if (images?.length) {
      await ProductImage.bulkCreate(
        images.map((url) => ({ product_id: product.product_id, image_url: url })),
        { transaction: t }
      );
    }

    await t.commit();

    // Return slug instead of numeric ID
    res.status(201).json({
      message: "Product created",
      slug: product.slug,
    });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

/** GET single product by slug */
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: ProductCategory, as: "category" },
        { model: ProductImage, as: "images" },
      ],
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Return API without exposing product_id
    const { product_id, admin_id, ...safeProduct } = product.toJSON();
    res.json(safeProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** UPDATE product by slug */
export const updateProduct = async (req, res) => {
  const t = await Product.sequelize.transaction();
  try {
    const product = await Product.findOne({ where: { slug: req.params.slug } });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { images, product_name, ...productData } = req.body;

    // If name is updated, regenerate slug
    if (product_name) {
      productData.name = product_name;
      productData.slug = slugify(product_name, { lower: true, strict: true });
    }

    await product.update(productData, { transaction: t });

    if (images) {
      await ProductImage.destroy({ where: { product_id: product.product_id }, transaction: t });
      if (images.length) {
        await ProductImage.bulkCreate(
          images.map((url) => ({ product_id: product.product_id, image_url: url })),
          { transaction: t }
        );
      }
    }

    await t.commit();
    res.json({ message: "Product updated", slug: product.slug });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

/** DELETE product by slug */
export const deleteProduct = async (req, res) => {
  const t = await Product.sequelize.transaction();
  try {
    const product = await Product.findOne({ where: { slug: req.params.slug } });
    if (!product) return res.status(404).json({ message: "Product not found" });

    await ProductImage.destroy({ where: { product_id: product.product_id }, transaction: t });
    await product.destroy({ transaction: t });

    await t.commit();
    res.json({ message: "Product deleted" });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

/** GET all products (no id exposed) */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: ProductCategory, as: "category" },
        { model: ProductImage, as: "images" },
      ],
    });

    // Strip IDs from API response
    const safeProducts = products.map((p) => {
      const { product_id, admin_id, ...rest } = p.toJSON();
      return rest;
    });

    res.json(safeProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};