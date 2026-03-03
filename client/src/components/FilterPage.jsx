import React from "react";
import { SlidersHorizontal } from "lucide-react";

const FilterPage = ({
  selectedMaterials,
  selectedRegions,
  priceRange,
  toggleMaterial,
  toggleRegion,
  setPriceRange,
}) => {
  return (
    <aside className="w-[200px] lg:w-64 shrink-0 sticky top-10 self-start h-[80vh] overflow-y-auto pr-2">
      
      <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-4 flex items-center justify-between">
        Filter By <SlidersHorizontal size={14} />
      </h3>

      <div className="space-y-6">
        
        {/* Material */}
        <div>
          <label className="text-sm font-medium text-stone-800 block mb-3 underline decoration-amber-200 underline-offset-4">
            Material
          </label>

          {["Pure Silk", "Organic Cotton", "Linen Blend", "Khadi"].map(
            (item) => (
              <label
                key={item}
                className="flex items-center text-sm text-stone-600 cursor-pointer hover:text-amber-800"
              >
                <input
                  type="checkbox"
                  className="mr-3"
                  checked={selectedMaterials.includes(item)}
                  onChange={() => toggleMaterial(item)}
                />
                {item}
              </label>
            )
          )}
        </div>

        {/* Region */}
        <div>
          <label className="text-sm font-medium text-stone-800 block mb-3 underline decoration-amber-200 underline-offset-4">
            Region
          </label>

          {["Banaras", "Chanderi", "Kanchipuram", "Maheshwar"].map(
            (item) => (
              <label
                key={item}
                className="flex items-center text-sm text-stone-600 cursor-pointer hover:text-amber-800"
              >
                <input
                  type="checkbox"
                  className="mr-3"
                  checked={selectedRegions.includes(item)}
                  onChange={() => toggleRegion(item)}
                />
                {item}
              </label>
            )
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
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([0, parseInt(e.target.value, 10)])
            }
          />

          <div className="flex justify-between text-xs text-stone-500 mt-2">
            <span>$0</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default FilterPage;