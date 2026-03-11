import React from "react";
import { Package } from "lucide-react";

const OrderItemCard = ({ item }) => {
  const { product } = item;

  return (
    <div className="flex items-center gap-4 p-4 border border-stone-200 rounded-lg bg-white">

      {/* Product Image */}
      <div className="h-16 w-12 bg-stone-100 overflow-hidden border border-stone-200">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-stone-300">
            <Package size={16} />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h4 className="text-sm font-serif text-[#5C4033] font-medium">
          {product.name}
        </h4>
        <p className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">
          {product.slug}
        </p>
      </div>

      {/* Quantity */}
      <div className="text-center">
        <span className="text-xs text-stone-400 uppercase tracking-widest block">
          Qty
        </span>
        <span className="text-sm font-medium">{item.quantity}</span>
      </div>

      {/* Price */}
      <div className="text-right">
        <span className="text-xs text-stone-400 uppercase tracking-widest block">
          Price
        </span>
        <span className="text-sm font-medium">
          ${item.price.toFixed(2)}
        </span>
      </div>

      {/* Subtotal */}
      <div className="text-right w-24">
        <span className="text-xs text-stone-400 uppercase tracking-widest block">
          Subtotal
        </span>
        <span className="text-sm font-medium">
          ${item.subTotal.toFixed(2)}
        </span>
      </div>

    </div>
  );
};

export default OrderItemCard;