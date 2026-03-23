import React from "react";
import { Package, X } from "lucide-react";

const OrderItemCard = ({ item }) => {
  const { product } = item;

  return (
    <div className="flex items-center gap-4 p-4 border border-stone-200 rounded-lg bg-white hover:shadow-sm transition-shadow">
      {/* Product Image */}
      <div className="h-20 w-20 bg-stone-100 overflow-hidden rounded-lg border border-stone-100 shrink-0">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-stone-300">
            <Package size={20} />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-stone-900 truncate">
          {product.name}
        </h4>
        <p className="text-xs text-stone-400 mt-0.5">
          SKU: {product.slug}
        </p>
        <p className="text-xs text-stone-500 mt-1">
          LKR {item.price.toFixed(2)} each
        </p>
      </div>

      {/* Quantity Badge */}
      <div className="px-3 py-1.5 bg-stone-50 rounded-lg text-center min-w-[60px]">
        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
          Qty
        </span>
        <span className="text-sm font-semibold text-stone-700">{item.quantity}</span>
      </div>

      {/* Subtotal */}
      <div className="text-right min-w-[80px]">
        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
          Total
        </span>
        <span className="text-base font-semibold text-stone-800">
          LKR {item.subTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderItemCard;
