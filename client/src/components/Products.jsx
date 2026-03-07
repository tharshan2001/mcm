import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../stores/cartStore"; // <-- Import cart store

const Products = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
      {products.map((product, idx) => (
        <HoverProductCard key={idx} product={product} />
      ))}
    </div>
  );
};

// Separate component to handle hover image carousel and navigation
const HoverProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const { addItem } = useCartStore(); // <-- Access Zustand addItem function

  // Cycle images every 700ms on hover
  React.useEffect(() => {
    if (!hovered || !product.images || product.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }, 700);

    return () => clearInterval(interval);
  }, [hovered, product.images]);

  // Navigate to product detail page
  const handleNavigate = () => {
    navigate(`/shop/${product.slug}`);
  };

  // Quick Add to cart
  const handleQuickAdd = async (e) => {
    e.stopPropagation(); // Prevent navigating to product detail
    await addItem(product.id, 1); // Add 1 quantity to cart
  };

  return (
    <div
      className="group flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCurrentImage(0); // reset to first image
      }}
      onClick={handleNavigate} // navigate on click
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-4 rounded-sm">
        <img
          src={
            product.images?.length > 0
              ? product.images[currentImage]
              : "https://via.placeholder.com/300"
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleQuickAdd} // Connects to Zustand API
            className="w-full bg-white/95 backdrop-blur-sm text-stone-900 py-3 text-xs font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-[#5C4033] hover:text-white transition-colors"
          >
            <ShoppingBag size={14} /> Quick Add
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-start">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-800 font-bold">
            {product.categoryName || "Uncategorized"}
          </p>

          {product.stockQuantity < 15 && (
            <span className="text-[9px] text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded-full uppercase">
              Only {product.stockQuantity} left
            </span>
          )}
        </div>

        <h3 className="text-lg font-serif text-stone-800 leading-tight group-hover:text-amber-900 transition-colors">
          {product.name}
        </h3>

        <p className="text-stone-500 text-sm font-light line-clamp-1">
          {product.description}
        </p>

        <p className="text-stone-900 font-medium pt-2 text-lg">${product.price}</p>
      </div>
    </div>
  );
};

export default Products;