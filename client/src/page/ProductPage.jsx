import React, { useState, useEffect } from "react";
import ProductDetail from "../components/product/ProductDetail";
import ProductFeedback from "../components/feedback/ProductFeedback";
import FeedbackList from "../components/feedback/FeedbackList";
import RelatedProductsCarousel from "../components/product/RelatedProductsCarousel";

const ProductPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [categorySlug, setCategorySlug] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleFeedbackSubmitted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleProductLoaded = (product) => {
    if (product?.categoryName) {
      setCategorySlug(product.categoryName);
    }
  };

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`transform transition-all duration-700 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <ProductDetail onProductLoaded={handleProductLoaded} />
      </div>

      {/* Editorial Layout: Feedback sections separated by clear space */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {categorySlug && (
          <div className={`transform transition-all duration-700 delay-200 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-serif text-stone-800">
                You May Also Like
              </h2>
              <span className="hidden sm:block text-xs uppercase tracking-widest text-stone-400">
                Swipe to explore
              </span>
            </div>
            <RelatedProductsCarousel categorySlug={categorySlug} limit={6} />
          </div>
        )}

        <div className={`transform transition-all duration-700 delay-300 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <FeedbackList refreshKey={refreshKey} />
        </div>

        <div className={`border-t border-stone-200 pt-16 transform transition-all duration-700 delay-400 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <ProductFeedback onFeedbackSubmitted={handleFeedbackSubmitted} />
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
