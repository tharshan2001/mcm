import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import api from '../service/api'; // Axios instance

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('products'); 
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-stone-600">Loading products...</div>;
  }

  return (
    <div className="bg-[#FCF9F6] min-h-screen">
      {/* Page Header */}
      <div className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-200">
        <h1 className="text-4xl font-serif text-[#5C4033] mb-2">The Archive</h1>
        <p className="text-stone-500 font-light italic">Curated handlooms from India's master weaving clusters.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8 shrink-0">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-4 flex items-center justify-between">
                Filter By <SlidersHorizontal size={14} />
              </h3>
              {/* Filters (static for now) */}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
              <span className="text-sm text-stone-500">{products.length} Masterpieces Found</span>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select className="appearance-none bg-transparent border border-stone-200 py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800 rounded-sm cursor-pointer">
                    <option>Sort: Popularity</option>
                    <option>Sort: New Arrivals</option>
                    <option>Sort: Price Low-High</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400" size={14} />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {products.map((product, idx) => (
                <div key={idx} className="group flex flex-col">
                  {/* Image Area */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-4 rounded-sm">
                    <img
                      src={product.images[0]?.image_url || 'https://via.placeholder.com/300'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Quick Add Overlay */}
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
                        {product.category?.category_name || 'Uncategorized'}
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;