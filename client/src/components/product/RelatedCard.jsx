import React from "react";

const RelatedCard = ({ product, onClick }) => {
  return (
    <div
      className="flex flex-col cursor-pointer bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 p-3"
      onClick={onClick}
    >
      {/* Product image */}
      <div className="w-full aspect-[4/5] overflow-hidden rounded-sm mb-2">
        <img
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/300"
          }
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product category */}
      <p className="text-[10px] uppercase text-amber-800 font-bold mb-1">
        {product.categoryName || "Uncategorized"}
      </p>

      {/* Product name */}
      <h3 className="text-sm font-semibold text-stone-800 mb-1 line-clamp-2">
        {product.name}
      </h3>

      {/* Product price */}
      <p className="text-stone-900 font-medium">LKR {product.price}</p>
    </div>
  );
};

export default RelatedCard;