import Product from "./Product.js";
import ProductImage from "./ProductImage.js";
import ProductCategory from "./ProductCategory.js";

/* Category → Product */
Product.belongsTo(ProductCategory, {
  foreignKey: "category_id",
  as: "category",
});

ProductCategory.hasMany(Product, {
  foreignKey: "category_id",
});

/* Product → Images */
Product.hasMany(ProductImage, {
  foreignKey: "product_id",
  as: "images",
});

ProductImage.belongsTo(Product, {
  foreignKey: "product_id",
});

export {
  Product,
  ProductImage,
  ProductCategory,
};