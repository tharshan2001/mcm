import React from 'react';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-stone-500 font-serif italic">No masterpieces found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {products.map((product) => (
        <div 
          key={product.id || product.slug} 
          className="group flex flex-col cursor-pointer"
          onClick={() => navigate(`/product/${product.slug}`)}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-5 rounded-sm">
            <img
              src={product.images?.[0]?.image_url || 'https://via.placeholder.com/600x800'}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            
            {/* Overlay Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.stock_quantity < 10 && (
                <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[9px] font-bold uppercase tracking-tighter text-red-700 shadow-sm">
                  Limited Edition
                </span>
              )}
            </div>

            {/* Hover Action Bar */}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); /* Add to cart logic */ }}
                className="flex-1 bg-white text-stone-900 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#5C4033] hover:text-white transition-colors shadow-lg"
              >
                <ShoppingBag size={14} /> Quick Add
              </button>
              <button 
                className="bg-white/90 backdrop-blur-sm p-3 text-stone-700 hover:text-amber-800 transition-colors shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <Heart size={16} />
              </button>
            </div>
          </div>

          {/* Product Meta */}
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-800 font-bold">
                {product.category?.category_name || 'Handloom'}
              </p>
              <p className="text-sm font-serif text-stone-900 font-bold">
                LKR {product.price}
              </p>
            </div>
            
            <h3 className="text-lg font-serif text-stone-800 leading-snug group-hover:text-amber-900 transition-colors">
              {product.name}
            </h3>
            
            <p className="text-stone-500 text-xs font-light line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="pt-2 flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-stone-200 group-hover:bg-amber-200 transition-colors" />
                ))}
              </div>
              <span className="text-[9px] text-stone-400 uppercase tracking-widest">
                {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;