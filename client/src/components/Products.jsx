import React from "react";
import { ShoppingBag } from "lucide-react";

const Products = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
      {products.map((product, idx) => (
        <div key={idx} className="group flex flex-col">
          
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-4 rounded-sm">
            <img
              src={product.images[0]?.image_url || "https://via.placeholder.com/300"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button className="w-full bg-white/95 backdrop-blur-sm text-stone-900 py-3 text-xs font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-[#5C4033] hover:text-white transition-colors">
                <ShoppingBag size={14} /> Quick Add
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-1">
            <div className="flex justify-between items-start">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-800 font-bold">
                {product.category?.category_name || "Uncategorized"}
              </p>

              {product.stock_quantity < 15 && (
                <span className="text-[9px] text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded-full uppercase">
                  Only {product.stock_quantity} left
                </span>
              )}
            </div>

            <h3 className="text-lg font-serif text-stone-800 leading-tight group-hover:text-amber-900 transition-colors">
              {product.name}
            </h3>

            <p className="text-stone-500 text-sm font-light line-clamp-1">
              {product.description}
            </p>

            <p className="text-stone-900 font-medium pt-2 text-lg">
              ${product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;