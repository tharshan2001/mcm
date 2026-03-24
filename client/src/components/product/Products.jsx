import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../../stores/cartStore";
import { useAuthStore } from "../../stores/authStore";

const Products = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-stone-500">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((product, idx) => (
        <HoverProductCard key={idx} product={product} />
      ))}
    </div>
  );
};

const HoverProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { user, openLogin } = useAuthStore();

  React.useEffect(() => {
    if (!hovered || !product.images || product.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }, 700);

    return () => clearInterval(interval);
  }, [hovered, product.images]);

  const handleNavigate = () => {
    navigate(`/shop/${product.slug}`);
  };

  const handleQuickAdd = async (e) => {
    e.stopPropagation();
    if (!user) {
      openLogin();
      return;
    }
    await addItem(product.id, 1);
  };

  return (
    <div
      className="group flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCurrentImage(0);
      }}
      onClick={handleNavigate}
    >
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
            onClick={handleQuickAdd}
            className="w-full bg-white/95 text-stone-900 py-3 text-xs font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-[#5C4033] hover:text-white"
          >
            <ShoppingBag size={14} /> Quick Add
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-800 font-bold">
          {product.categoryName || "Uncategorized"}
        </p>

        <h3 className="text-lg font-serif text-stone-800">{product.name}</h3>

        <p className="text-stone-500 text-sm line-clamp-1">
          {product.description}
        </p>

        <p className="text-yellow-600 font-medium pt-2 text-lg">
          LKR {product.price}
        </p>
      </div>
    </div>
  );
};

export default Products;