import { Product, ProductImage, ProductCategory } from "../models/index.js";

/** CREATE product with short unique slug */
export const createProduct = async (req, res) => {
  const t = await Product.sequelize.transaction();
  try {
    const { product_name, product_description, price, stock, category_id, images } = req.body;
    const admin_id = req.admin?.admin_id;

    if (!admin_id) {
      return res.status(400).json({ error: "Admin not authenticated" });
    }

    // Generate slug with short random 3-4 digit number
    const randomSuffix = Math.floor(100 + Math.random() * 9000); // 3-4 digit number
    const slug = `${product_name?.toLowerCase().replace(/\s+/g, "-")}-${randomSuffix}`;

    // Create product
    const product = await Product.create(
      {
        name: product_name,
        description: product_description,
        price,
        stock_quantity: stock,
        category_id,
        admin_id,
        slug,
      },
      { transaction: t }
    );

    // Save images
    if (images?.length) {
      await ProductImage.bulkCreate(
        images.map((url) => ({ product_id: product.product_id, image_url: url })),
        { transaction: t }
      );
    }

    await t.commit();

    res.status(201).json({
      message: "Product created",
      slug: product.slug,
      id: product.product_id,
    });
  } catch (err) {
    await t.rollback();
    if (err.name === "SequelizeValidationError") {
      const messages = err.errors.map((e) => e.message);
      return res.status(400).json({ error: "Validation error", details: messages });
    }
    res.status(500).json({ error: err.message });
  }
};

/** GET single product by slug (only if not archived) */
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug, archived: false },
      include: [
        { model: ProductCategory, as: "category" },
        { model: ProductImage, as: "images" },
      ],
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    const { product_id, admin_id, ...safeProduct } = product.toJSON();
    res.json(safeProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** UPDATE product by ID */
export const updateProductById = async (req, res) => {
  const t = await Product.sequelize.transaction();
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { images, product_name, ...productData } = req.body;

    // If name is updated, regenerate slug
    if (product_name) {
      productData.name = product_name;
      const randomSuffix = Math.floor(100 + Math.random() * 9000);
      productData.slug = `${product_name.toLowerCase().replace(/\s+/g, "-")}-${randomSuffix}`;
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

/** ARCHIVE product by ID */
export const archiveProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Mark as archived
    await product.update({ archived: true });

    res.json({ message: "Product archived" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** GET all products (exclude archived) */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { archived: false },
      include: [
        { model: ProductCategory, as: "category" },
        { model: ProductImage, as: "images" },
      ],
    });

    const safeProducts = products.map((p) => {
      const { product_id, admin_id, ...rest } = p.toJSON();
      return rest;
    });

    res.json(safeProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** GET all materials (exclude archived) */
export const getAllMaterials = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { archived: false },
      include: [
        {
          model: ProductCategory,
          as: "category",
          required: true,
          where: { category_name: "materials" },
        },
        { model: ProductImage, as: "images" },
      ],
    });

    const safeProducts = products.map((p) => {
      const { product_id, admin_id, ...rest } = p.toJSON();
      return rest;
    });

    res.json(safeProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};