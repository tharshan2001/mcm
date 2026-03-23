import React from 'react';
import { Edit2, Trash2, Archive, ArchiveRestore, ImageOff } from 'lucide-react';

const ProductCard = React.forwardRef(({ product, onEdit, onDelete, onToggleArchive }, ref) => {
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 5;
  const isOutOfStock = product.stockQuantity === 0;

  const formattedPrice = typeof product.price === 'number'
    ? product.price.toFixed(2)
    : parseFloat(product.price || 0).toFixed(2);

  return (
    <tr ref={ref} className={`group border-b border-stone-100 transition-colors hover:bg-[#FCF9F6] ${product.archived ? 'bg-stone-50/50' : 'bg-white'}`}>
      
      {/* 1. Image & Primary Info */}
      <td className="py-4 pl-6 pr-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-11 bg-stone-100 flex-shrink-0 overflow-hidden border border-stone-200 shadow-sm">
            {product.images?.length > 0 ? (
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className={`w-full h-full object-cover ${product.archived ? 'grayscale opacity-50' : ''}`} 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-300">
                <ImageOff size={14} />
              </div>
            )}
          </div>
          <div>
            <h4 className={`text-sm font-serif ${product.archived ? 'text-stone-400' : 'text-[#5C4033]'} font-medium`}>
              {product.name}
            </h4>
            <p className="text-[10px] text-stone-400 font-mono mt-0.5 uppercase tracking-tighter">
              slug: {product.slug}
            </p>
          </div>
        </div>
      </td>

      {/* 2. Category */}
      <td className="px-4 py-4">
        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-amber-800 bg-amber-50 px-2 py-1 rounded-sm">
          {product.categoryName || 'General'}
        </span>
      </td>

      {/* 3. Price */}
      <td className="px-4 py-4">
        <span className="text-sm font-medium text-stone-700 font-serif">
          LKR {formattedPrice}
        </span>
      </td>

      {/* 4. Stock */}
      <td className="px-4 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${
              isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-amber-500' : 'bg-green-500'
            }`} />
            <span className={`text-sm ${isOutOfStock ? 'text-red-600 font-bold' : 'text-stone-700'}`}>
              {product.stockQuantity}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-stone-400">Available units</span>
        </div>
      </td>

      {/* 5. Status */}
      <td className="px-4 py-4">
        {product.archived ? (
          <div className="flex items-center gap-1.5 text-stone-400">
            <Archive size={12} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Archived</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-green-600">
            <div className="h-1 w-1 bg-green-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Live</span>
          </div>
        )}
      </td>

      {/* 6. Actions */}
      <td className="py-4 pl-4 pr-6 text-right">
        <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          
          {/* Edit */}
          <button 
            onClick={() => onEdit(product.slug)} 
            className="flex flex-col items-center p-2 text-stone-400 hover:text-[#5C4033] hover:bg-white rounded-full transition-all" 
            title="Edit"
          >
            <Edit2 size={16} strokeWidth={1.5} />
            <span className="text-[8px] mt-1 font-mono uppercase tracking-widest">Edit</span>
          </button>

          {/* Archive / Restore */}
          <button 
            onClick={() => onToggleArchive(product.id)} 
            className="flex flex-col items-center p-2 text-stone-400 hover:text-amber-700 hover:bg-white rounded-full transition-all" 
            title={product.archived ? "Restore" : "Archive"}
          >
            {product.archived ? <ArchiveRestore size={16} strokeWidth={1.5} /> : <Archive size={16} strokeWidth={1.5} />}
            <span className="text-[8px] mt-1 font-mono uppercase tracking-widest">
              {product.archived ? "Restore" : "Archive"}
            </span>
          </button>

          <div className="w-px h-4 bg-stone-200 mx-1" />

          {/* Delete */}
          <button 
            onClick={() => onDelete(product.id)} 
            className="flex flex-col items-center p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" 
            title="Delete"
          >
            <Trash2 size={16} strokeWidth={1.5} />
            <span className="text-[8px] mt-1 font-mono uppercase tracking-widest">Delete</span>
          </button>

        </div>
      </td>
    </tr>
  );
});

export default ProductCard;