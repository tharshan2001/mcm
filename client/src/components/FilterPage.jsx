import React, { useState, useEffect } from "react";
import { SlidersHorizontal, X, Loader2 } from "lucide-react";
import { fetchCategories } from "../service/categoryService";

const FilterPage = ({
  selectedMaterials,
  priceRange,
  toggleMaterial,
  setPriceRange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    loadCategories();
  }, []);

  // Desktop Sidebar
  const desktopSidebar = (
    <aside className="hidden lg:block w-[100px] lg:w-40 shrink-0 sticky top-10 self-start h-[70vh] pr-2 ">
      <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-4 flex items-center justify-between">
        Filter By <SlidersHorizontal size={14} />
      </h3>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium text-stone-800 block mb-3 underline decoration-amber-200 underline-offset-4">
            Category
          </label>
          {categoriesLoading ? (
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Loader2 size={12} className="animate-spin" />
              Loading...
            </div>
          ) : categories.length > 0 ? (
            categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center text-sm text-stone-600 cursor-pointer hover:text-amber-800 py-0.5"
              >
                <input
                  type="checkbox"
                  className="mr-3"
                  checked={selectedMaterials.includes(cat.name)}
                  onChange={() => toggleMaterial(cat.name)}
                />
                {cat.name}
              </label>
            ))
          ) : (
            <p className="text-xs text-stone-400">No categories available</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium text-stone-800 block mb-3 underline decoration-amber-200 underline-offset-4">
            Price Range
          </label>
          <input
            type="range"
            className="w-full accent-amber-800"
            min="0"
            max="25000" // ✅ Increased to 10000
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
          />
          <div className="flex justify-between text-xs text-stone-500 mt-2">
            <span>LKR 0</span>
            <span>LKR {priceRange[1]}</span>
          </div>
        </div>
      </div>
    </aside>
  );

  // Mobile Drawer
  const mobileDrawer = (
    <>
      {/* mobile button */}
      <div className="lg:hidden fixed bottom-10 right-1 z-50">
        <button
          className="bg-[#5C4033] text-white p-1.5 rounded-full shadow-lg flex items-end"
          onClick={() => setIsOpen(true)}
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 flex items-center space-x-2">
            Filter By <SlidersHorizontal size={14} />
          </h3>
          <button onClick={() => setIsOpen(false)} className="p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-56px)]">
          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium text-stone-800 block mb-3 underline decoration-amber-200 underline-offset-4">
              Category
            </label>
            {categoriesLoading ? (
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Loader2 size={12} className="animate-spin" />
                Loading...
              </div>
            ) : categories.length > 0 ? (
              categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center text-sm text-stone-600 cursor-pointer hover:text-amber-800 py-0.5"
                >
                  <input
                    type="checkbox"
                    className="mr-3"
                    checked={selectedMaterials.includes(cat.name)}
                    onChange={() => toggleMaterial(cat.name)}
                  />
                  {cat.name}
                </label>
              ))
            ) : (
              <p className="text-xs text-stone-400">No categories available</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-stone-800 block mb-3 underline decoration-amber-200 underline-offset-4">
              Price Range
            </label>
            <input
              type="range"
              className="w-full accent-amber-800"
              min="0"
              max="10000" // ✅ Increased to 10000
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([0, parseInt(e.target.value, 10)])
              }
            />
            <div className="flex justify-between text-xs text-stone-500 mt-2">
              <span>LKR 0</span>
              <span>LKR {priceRange[1]}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );

  return (
    <>
      {desktopSidebar}
      {mobileDrawer}
    </>
  );
};

export default FilterPage;