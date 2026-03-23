import React, { useState, useEffect, useRef, useCallback } from "react";
import CategoryCard from "./CategoryCard";
import CategoryUpdatePopover from "./CategoryUpdatePopover";
import CategoryCreate from "./CategoryCreate";
import { Loader2, Plus, PackageOpen, AlertCircle } from "lucide-react";
import { fetchCategories } from "../../service/categoryService";

const PAGE_SIZE = 10;

export default function CategoryList() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [error, setError] = useState(null);

  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [editingCategory, setEditingCategory] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [closingModal, setClosingModal] = useState(false);

  const observer = useRef();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const loadCategories = async (cursor = null) => {
    try {

      cursor ? setScrollLoading(true) : setLoading(true);

      const data = await fetchCategories(cursor);

      if (cursor) {
        setCategories((prev) => {
          const existingIds = new Set(prev.map((c) => c.id));
          const newCategories = data.filter((c) => !existingIds.has(c.id));
          return [...prev, ...newCategories];
        });
      } else {
        setCategories(data);
      }

      if (data.length > 0) {
        setNextCursor(data[data.length - 1].id);
        setHasMore(data.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }

    } catch (err) {

      console.error(err);
      setError("Failed to load categories.");
      setHasMore(false);

    } finally {

      setLoading(false);
      setScrollLoading(false);

    }
  };

  const lastCategoryRef = useCallback(
    (node) => {
      if (scrollLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {

          if (entries[0].isIntersecting && hasMore && !scrollLoading) {
            loadCategories(nextCursor);
          }

        },
        { root: scrollContainerRef.current, threshold: 0.1 }
      );

      if (node) observer.current.observe(node);

    },
    [scrollLoading, hasMore, nextCursor]
  );

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const closeEditModal = () => {

    setClosingModal(true);

    setTimeout(() => {
      setEditingCategory(null);
      setClosingModal(false);
    }, 300);

  };

  return (
    <div className="bg-stone-50 min-h-[700px] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between mb-6">

          <div>
            <h1 className="text-2xl font-serif text-stone-800">
              Category Manager
            </h1>
            <p className="text-sm text-stone-500 mt-2">
              {categories.length} Categories
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-[#5C4033] text-white px-8 py-4 text-[8px] font-bold uppercase tracking-[0.2em]"
          >
            <Plus size={14} /> New Category
          </button>

        </div>

        {error ? (
          <div className="bg-red-50 border-l-2 border-red-400 p-4 flex items-center gap-4 text-red-800 italic">
            <AlertCircle size={20}/> {error}
          </div>
        ) : categories.length === 0 ? (

          <div className="text-center py-32 bg-white border border-dashed border-stone-200">
            <PackageOpen size={48} className="mx-auto text-stone-200 mb-4"/>
            <p className="font-serif italic text-stone-400">
              No categories available.
            </p>
          </div>

        ) : (

          <div
            ref={scrollContainerRef}
            className="bg-white overflow-y-auto max-h-[500px]"
          >

            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="sticky top-0 bg-[#FCF9F6] border-b border-stone-200">

                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                    ID
                  </th>

                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                    Name
                  </th>

                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                    Description
                  </th>

                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold text-right">
                    Management
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">

                {categories.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onEdit={() => handleEdit(category)}
                    ref={index === categories.length - 1 ? lastCategoryRef : null}
                  />
                ))}

              </tbody>

            </table>

            {scrollLoading && (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin text-amber-800" size={24}/>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Update Modal */}
      {editingCategory && (
        <CategoryUpdatePopover
          categoryData={editingCategory}
          closing={closingModal}
          onClose={closeEditModal}
          onUpdated={() => loadCategories()}
        />
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">

          <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg relative">

            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-2 right-2 text-stone-400"
            >
              ✕
            </button>

            <CategoryCreate
              onCreated={() => {
                setShowCreateModal(false);
                loadCategories();
              }}
            />

          </div>

        </div>
      )}

    </div>
  );
}