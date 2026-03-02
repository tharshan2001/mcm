import React, { useState } from 'react';
import { Filter, ChevronDown, SlidersHorizontal, ShoppingBag } from 'lucide-react';

const ShopPage = () => {
  // Demo Data based on your requested structure
  const products = [
    {
      name: "Hand-Spun Tussar Silk Saree",
      slug: "tussar-silk-saree",
      description: "Traditional weave with gold zari border.",
      price: "185.00",
      stock_quantity: 12,
      category: { category_name: "Sarees" },
      images: [{ image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600" }]
    },
    {
      name: "Indigo Dabu Print Cotton",
      slug: "indigo-dabu-cotton",
      description: "Natural indigo dyed with mud-resist printing.",
      price: "45.00",
      stock_quantity: 25,
      category: { category_name: "Fabrics" },
      images: [{ image_url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600" }]
    },
    // ... more items
  ];

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
              
              {/* Category Filter */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-stone-800 block mb-3 underline decoration-amber-200 underline-offset-4">Material</label>
                  <div className="space-y-2">
                    {['Pure Silk', 'Organic Cotton', 'Linen Blend', 'Khadi'].map((item) => (
                      <label key={item} className="flex items-center text-sm text-stone-600 cursor-pointer hover:text-amber-800">
                        <input type="checkbox" className="rounded border-stone-300 text-amber-800 focus:ring-amber-800 mr-3" />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-stone-800 block mb-3 underline decoration-amber-200 underline-offset-4">Region</label>
                  <div className="space-y-2">
                    {['Banaras', 'Chanderi', 'Kanchipuram', 'Maheshwar'].map((item) => (
                      <label key={item} className="flex items-center text-sm text-stone-600 cursor-pointer hover:text-amber-800">
                        <input type="checkbox" className="rounded border-stone-300 text-amber-800 focus:ring-amber-800 mr-3" />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-stone-800 block mb-3 underline decoration-amber-200 underline-offset-4">Price Range</label>
                  <input type="range" className="w-full accent-amber-800" min="0" max="1000" />
                  <div className="flex justify-between text-xs text-stone-500 mt-2">
                    <span>$0</span>
                    <span>$1000+</span>
                  </div>
                </div>
              </div>
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
                      src={product.images[0].image_url}
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
                        {product.category.category_name}
                      </p>
                      {product.stock_quantity < 15 && (
                        <span className="text-[9px] text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded-full uppercase">Only {product.stock_quantity} left</span>
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