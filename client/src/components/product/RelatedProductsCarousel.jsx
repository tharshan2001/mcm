import React, { useEffect, useState, useRef } from "react";
import { fetchProductBySlug, fetchRelatedProducts } from "../../service/product";
import RelatedCard from "./RelatedCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

const RelatedProductsCarousel = ({ productSlug, onProductClick }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const loadRelated = async () => {
      if (!productSlug) return;

      try {
        console.log("[RelatedProductsCarousel] Fetching product details for slug:", productSlug);

        // 1️⃣ Fetch main product details
        const product = await fetchProductBySlug(productSlug);
        console.log("[RelatedProductsCarousel] Main product:", product);

        if (!product?.id) return;

        // 2️⃣ Fetch related products using product ID
        const related = await fetchRelatedProducts(product.id);
        console.log("[RelatedProductsCarousel] Related products:", related);
        setRelatedProducts(related);
      } catch (error) {
        console.error("[RelatedProductsCarousel] Error fetching related products:", error);
      }
    };

    loadRelated();
  }, [productSlug]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  if (!relatedProducts || relatedProducts.length === 0) {
    return <p className="text-center text-stone-500">No related products found.</p>;
  }

  return (
    <div className="relative my-6">
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
            <RelatedCard
              product={product}
              onClick={() => onProductClick(product)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;