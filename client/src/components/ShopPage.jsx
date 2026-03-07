import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import api from "../service/api";

import Products from "./Products";
import FilterPage from "./FilterPage";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Custom sort dropdown state
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Popularity");
  const sortOptions = ["Popularity", "New Arrivals", "Price Low-High"];

  // Fetch products
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

  // Filters
  const toggleMaterial = (material) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material],
    );
  };

  const toggleRegion = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region],
    );
  };

  // Filtering logic
  const filteredProducts = products.filter((p) => {
    const materialMatch =
      selectedMaterials.length === 0 ||
      selectedMaterials.includes(p.categoryName);

    const regionMatch =
      selectedRegions.length === 0 || selectedRegions.includes(p.categoryName);

    const price = parseFloat(p.price);
    const priceMatch = price >= priceRange[0] && price <= priceRange[1];

    return materialMatch && regionMatch && priceMatch;
  });

  if (loading) {
    return (
      <div className="text-center py-20 text-stone-600">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-[#FCF9F6] h-[740px] overflow-hidden">
      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-full flex gap-12">
        {/* Sidebar (Sticky) */}
        <FilterPage
          selectedMaterials={selectedMaterials}
          selectedRegions={selectedRegions}
          priceRange={priceRange}
          toggleMaterial={toggleMaterial}
          toggleRegion={toggleRegion}
          setPriceRange={setPriceRange}
        />

        {/* Products Area */}
        <main className="flex-1 h-full overflow-y-auto py-8 pr-2">
          {/* Toolbar */}
          <div className="flex justify-end items-center mb-8  top-0  z-10 pb-4">
            {/* Custom Sort Dropdown */}
            <div className="relative w-56 justify-left">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="w-full bg-white border border-stone-300 py-1.5 px-4 rounded-md text-sm flex justify-between items-center hover:border-stone-400 transition"
              >
                {sortOption}
                <ChevronDown size={16} />
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white border border-stone-200 rounded-md shadow-lg z-50">
                  {sortOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setSortOption(option);
                        setSortOpen(false);
                      }}
                      className="px-4 py-2 text-sm hover:bg-amber-50 hover:text-amber-900 cursor-pointer transition"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="mx-8">
            <Products products={filteredProducts} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
