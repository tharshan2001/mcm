import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRelatedProducts } from "../../service/product";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RelatedCard = ({ product, onClick, isVisible, index }) => {
  return (
    <div
      className={`flex flex-col cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-stone-100 overflow-hidden group
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
  const [visibleCards, setVisibleCards] = useState(new Set());
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index, 10);
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.2 }
    );

    const cards = container.querySelectorAll(".related-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [relatedProducts]);

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
        ref={(el) => {
          scrollRef.current = el;
          containerRef.current = el;
        }}
        onScroll={checkScrollButtons}
        className="flex overflow-x-auto gap-4 py-4 px-4 md:px-8 scroll-smooth [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {relatedProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 related-card"
            data-index={index}
          >
            <RelatedCard 
              product={product} 
              onClick={() => handleProductClick(product)}
              isVisible={visibleCards.has(index)}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;