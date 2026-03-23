import React, { useState } from "react";
import ProductDetail from "../components/product/ProductDetail";
import ProductFeedback from "../components/feedback/ProductFeedback";
import FeedbackList from "../components/feedback/FeedbackList";
import RelatedProductsCarousel from "../components/product/RelatedProductsCarousel";

const ProductPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [categorySlug, setCategorySlug] = useState(null);

  const handleFeedbackSubmitted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleProductLoaded = (product) => {
    if (product?.categoryName) {
      setCategorySlug(product.categoryName);
    }
  };

  return (
    <div className="min-h-screen">
      <ProductDetail onProductLoaded={handleProductLoaded} />

      {/* Editorial Layout: Feedback sections separated by clear space */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {categorySlug && (
          <div>
            <h2 className="text-xl font-serif text-stone-800 mb-4">
              Related Products
            </h2>
            <RelatedProductsCarousel categorySlug={categorySlug} limit={6} />
          </div>
        )}

        <FeedbackList refreshKey={refreshKey} />

        <div className="border-t border-stone-200 pt-16">
          <ProductFeedback onFeedbackSubmitted={handleFeedbackSubmitted} />
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
