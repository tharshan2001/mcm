import React, { useState, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import api from '../service/api'; // Axios instance

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Fetch products
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

  // Handle filter changes
  const toggleMaterial = (material) => {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]
    );
  };

  const toggleRegion = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((p) => {
    const materialMatch =
      selectedMaterials.length === 0 ||
      selectedMaterials.includes(p.category?.category_name);
    const regionMatch =
      selectedRegions.length === 0 ||
      selectedRegions.includes(p.category?.category_name); // Replace with actual region field if exists
    const price = parseFloat(p.price);
    const priceMatch = price >= priceRange[0] && price <= priceRange[1];
    return materialMatch && regionMatch && priceMatch;
  });

  if (loading) {
    return <div className="text-center py-20 text-stone-600">Loading products...</div>;
  }

  return (
    <div className="bg-[#FCF9F6] min-h-screen">
      {/* Page Header */}
      <div className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-200">
        <h1 className="text-4xl font-serif text-[#5C4033] mb-2">The Archive</h1>
        <p className="text-stone-500 font-light italic">
          Curated handlooms from India's master weaving clusters.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sticky Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8 shrink-0 sticky top-20 self-start">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-4 flex items-center justify-between">
                Filter By <SlidersHorizontal size={14} />
              </h3>

              {/* Material Filter */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-stone-800 block mb-3 underline decoration-amber-200 underline-offset-4">
                    Material
                  </label>
                  <div className="space-y-2">
                    {['Pure Silk', 'Organic Cotton', 'Linen Blend', 'Khadi'].map((item) => (
                      <label
                        key={item}
                        className="flex items-center text-sm text-stone-600 cursor-pointer hover:text-amber-800"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-stone-300 text-amber-800 focus:ring-amber-800 mr-3"
                          checked={selectedMaterials.includes(item)}
                          onChange={() => toggleMaterial(item)}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Region Filter */}
                <div>
                  <label className="text-sm font-medium text-stone-800 block mb-3 underline decoration-amber-200 underline-offset-4">
                    Region
                  </label>
                  <div className="space-y-2">
                    {['Banaras', 'Chanderi', 'Kanchipuram', 'Maheshwar'].map((item) => (
                      <label
                        key={item}
                        className="flex items-center text-sm text-stone-600 cursor-pointer hover:text-amber-800"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-stone-300 text-amber-800 focus:ring-amber-800 mr-3"
                          checked={selectedRegions.includes(item)}
                          onChange={() => toggleRegion(item)}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-stone-800 block mb-3 underline decoration-amber-200 underline-offset-4">
                    Price Range
                  </label>
                  <input
                    type="range"
                    className="w-full accent-amber-800"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
                  />
                  <div className="flex justify-between text-xs text-stone-500 mt-2">
                    <span>$0</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
              <span className="text-sm text-stone-500">{filteredProducts.length} Masterpieces Found</span>
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
              {filteredProducts.map((product, idx) => (
                <div key={idx} className="group flex flex-col">
                  {/* Image Area */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-4 rounded-sm">
                    <img
                      src={product.images[0]?.image_url || 'https://via.placeholder.com/300'}
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