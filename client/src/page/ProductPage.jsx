import React from "react";
import ProductDetail from "../components/product/ProductDetail";
import ProductFeedback from "../components/feedback/ProductFeedback";
import FeedbackList from "../components/feedback/FeedbackList";

const ProductPage = () => {
  return (
    <div>
      <ProductDetail />
      <FeedbackList/>
      <ProductFeedback />
    </div>
  );
};

export default ProductPage;
