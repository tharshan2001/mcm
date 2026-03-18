import React, { useState } from "react";
import ProductDetail from "../components/product/ProductDetail";
import ProductFeedback from "../components/feedback/ProductFeedback";
import FeedbackList from "../components/feedback/FeedbackList";
import RelatedProductsCarousel from "../components/product/RelatedProductsCarousel";

const ProductPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFeedbackSubmitted = () => {
    // Incrementing the key forces the FeedbackList to re-run its useEffect
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen">
      <ProductDetail />
      
      {/* Editorial Layout: Feedback sections separated by clear space */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <FeedbackList refreshKey={refreshKey} />
        
        <RelatedProductsCarousel/>
        
        <div className="border-t border-stone-200 pt-16">
          <ProductFeedback onFeedbackSubmitted={handleFeedbackSubmitted} />
        </div>
      </section>
    </div>
  );
};

export default ProductPage;