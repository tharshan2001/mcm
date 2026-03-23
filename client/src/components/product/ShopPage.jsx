import React, { useState, useEffect } from "react";
import { ChevronDown, Sliders } from "lucide-react"; 
import api from "../../service/api";

import Products from "./Products";
import FilterPage from "../FilterPage";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]); // ✅ Increased default max

  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Popularity");
  const sortOptions = ["Popularity", "New Arrivals", "Price Low-High"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleMaterial = (material) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const toggleRegion = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  // ✅ Fixed filter logic - show all products by default
  const filteredProducts = products.filter((p) => {
    const materialMatch =
      selectedMaterials.length === 0 ||
      selectedMaterials.includes(p.categoryName);
      
    // ✅ Region filter removed since products don't have region field
    
    const price = parseFloat(p.price);
    const priceMatch = price >= priceRange[0] && price <= priceRange[1];
    
    return materialMatch && priceMatch;
  });

  if (loading) {
    return (
      <div className="text-center py-20 text-stone-600">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5">
      <div className="max-w-8xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-12 h-[700px] lg:p-10 lg:pb-0">
        {/* Desktop Filter Sidebar */}
        <FilterPage
          selectedMaterials={selectedMaterials}
          selectedRegions={selectedRegions}
          priceRange={priceRange}
          toggleMaterial={toggleMaterial}
          toggleRegion={toggleRegion}
          setPriceRange={setPriceRange}
        />

        {/* Products Area */}
        <main className="flex-1 overflow-y-auto lg:p-10">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className={`relative w-40 sm:w-48 lg:w-56 bg-white border ${
                    sortOpen ? "border-[#5C4033]" : "border-stone-200"
                  } py-1.5 px-4 flex justify-between items-center mt-3 mb-2
                  text-[11px] uppercase tracking-widest font-medium text-stone-700
                  transition-all duration-300
                  hover:border-stone-400`}
                >
                  {sortOption}
                  <div
                    className={`transition-transform duration-300 ${
                      sortOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <ChevronDown
                      size={14}
                      strokeWidth={1.5}
                      className="text-stone-400"
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {sortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setSortOpen(false)}
                    />

                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-stone-200 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setSortOption(option);
                              setSortOpen(false);
                            }}
                            className={`
                              w-full text-left px-4 py-2 text-[10px] uppercase tracking-widest transition-colors
                              ${
                                sortOption === option
                                  ? "text-[#5C4033] bg-[#FCF9F6] font-bold"
                                  : "text-stone-500 hover:bg-[#FCF9F6] hover:text-[#5C4033]"
                              }
                            `}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <Products products={filteredProducts} />
        </main>
      </div>
    </div>
  );
};

export default ShopPage;