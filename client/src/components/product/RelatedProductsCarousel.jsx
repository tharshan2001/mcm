import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRelatedProducts } from "../../service/product";
import RelatedCard from "./RelatedCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

const RelatedProductsCarousel = ({ categorySlug, limit = 6 }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRelated = async () => {
      if (!categorySlug) return;

      try {
        const related = await fetchRelatedProducts(categorySlug, limit);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRelated();
  }, [categorySlug, limit]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  const handleProductClick = (product) => {
    navigate(`/shop/${product.slug}`);
  };

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-pulse flex gap-4 justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-40 h-56 bg-stone-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white"
      >
        <ArrowRight size={20} />
      </button>

      <div ref={scrollRef} className="flex overflow-x-auto gap-4 scroll-smooth px-4">
        {relatedProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-40">
            <RelatedCard product={product} onClick={() => handleProductClick(product)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;