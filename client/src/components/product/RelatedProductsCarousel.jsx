import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRelatedProducts } from "../../service/product";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RelatedCard = ({ product, onClick }) => {
  return (
    <div
      className="flex flex-col cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-stone-100 overflow-hidden group"
      onClick={onClick}
    >
      {/* Product image */}
      <div className="w-full aspect-[4/5] overflow-hidden bg-stone-100 relative">
        <img
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/300"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product info */}
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold mb-1.5">
          {product.categoryName || "Uncategorized"}
        </p>
        <h3 className="text-sm font-medium text-stone-800 mb-2 line-clamp-2 group-hover:text-[#5C4033] transition-colors">
          {product.name}
        </h3>
        <p className="text-base font-semibold text-[#5C4033]">LKR {product.price}</p>
      </div>
    </div>
  );
};

const RelatedProductsCarousel = ({ categorySlug, limit = 6 }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
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

  const checkScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 280; // Card width + gap
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleProductClick = (product) => {
    navigate(`/shop/${product.slug}`);
  };

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="flex gap-6 justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-64 h-80 bg-stone-100 rounded-xl animate-pulse" />
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
      {/* Navigation arrows - visible on tablet+ */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 bg-white border border-stone-200 p-2.5 rounded-full shadow-md hover:shadow-lg hover:border-[#5C4033] hover:bg-[#5C4033] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed items-center justify-center"
      >
        <ChevronLeft size={20} className="text-stone-600 group-hover:text-white" />
      </button>
      
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 bg-white border border-stone-200 p-2.5 rounded-full shadow-md hover:shadow-lg hover:border-[#5C4033] hover:bg-[#5C4033] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed items-center justify-center"
      >
        <ChevronRight size={20} className="text-stone-600 group-hover:text-white" />
      </button>

      {/* Products scroll container */}
      <div 
        ref={scrollRef}
        onScroll={checkScrollButtons}
        className="flex overflow-x-auto gap-4 py-4 px-4 md:px-8 scroll-smooth [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {relatedProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64">
            <RelatedCard 
              product={product} 
              onClick={() => handleProductClick(product)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;