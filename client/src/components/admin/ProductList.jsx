import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductCard from "./ProductCard";
import ProductUpdatePopover from "./ProductUpdatePopover";
import ProductCreate from "./ProductCreate";
import { Loader2, Plus, PackageOpen, AlertCircle } from "lucide-react";
import { fetchProducts, deleteProduct, toggleArchive } from "../../service/product";
import sweetAlert from "../../utils/sweetAlert";

const PAGE_SIZE = 10;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showCreatePopover, setShowCreatePopover] = useState(false);
  const [closingModal, setClosingModal] = useState(false);

  const observer = useRef();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const loadProducts = async (cursor = null) => {
    try {
      if (cursor) setScrollLoading(true);
      else setLoading(true);

      const data = await fetchProducts(cursor);

      if (cursor) {
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newProducts = data.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newProducts];
        });
      } else {
        setProducts(data);
      }

      if (data.length > 0) {
        setNextCursor(data[data.length - 1].id);
        setHasMore(data.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("The archive could not be reached at this time.");
      setHasMore(false);
    } finally {
      setLoading(false);
      setScrollLoading(false);
    }
  };

  const lastProductRef = useCallback(
    (node) => {
      if (scrollLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && hasMore && !scrollLoading) {
            loadProducts(nextCursor);
          }
        },
        { root: scrollContainerRef.current, threshold: 0.1 }
      );

      if (node) observer.current.observe(node);
    },
    [scrollLoading, hasMore, nextCursor]
  );

  const handleDelete = async (id, name) => {
    const result = await sweetAlert.deleteConfirm(name || "this product");
    if (!result.isConfirmed) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      sweetAlert.toast("Product deleted successfully!");
    } catch (err) {
      console.error("Failed to delete product:", err);
      sweetAlert.error("Action failed. Please try again.");
    }
  };

  const handleArchive = async (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const newArchivedStatus = !product.archived;

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, archived: newArchivedStatus } : p))
    );

    try {
      await toggleArchive(id, newArchivedStatus);
      sweetAlert.toast(newArchivedStatus ? "Product archived!" : "Product restored!");
    } catch (err) {
      console.error("Failed to archive product:", err);
      sweetAlert.error("Status update failed.");
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, archived: product.archived } : p))
      );
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const closeEditModal = () => {
    setClosingModal(true);
    setTimeout(() => {
      setEditingProduct(null);
      setClosingModal(false);
    }, 300);
  };

  return (
    <div className="bg-stone-50 min-h-[700px] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <h1 className="text-2xl font-serif text-stone-800">Inventory Manager</h1>
            <p className="text-sm text-stone-500 mt-2">
              {products.length} Curated Pieces in Collection
            </p>
          </div>

          {/* New Product Button */}
          <button
            onClick={() => setShowCreatePopover(true)}
            className="flex items-center gap-2 bg-[#5C4033] text-white px-6 py-3 text-sm font-medium rounded-lg hover:bg-[#4A332A] transition-colors"
          >
            <Plus size={14} /> New Product
          </button>
        </div>

        {error ? (
          <div className="bg-red-50 border-l-2 border-red-400 p-4 flex items-center gap-4 text-red-800 italic">
            <AlertCircle size={20} /> {error}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-white border border-dashed border-stone-200">
            <PackageOpen size={48} className="mx-auto text-stone-200 mb-4" />
            <p className="font-serif italic text-stone-400">The archive is currently empty.</p>
          </div>
        ) : (
          <div ref={scrollContainerRef} className="bg-white overflow-y-auto max-h-[500px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="sticky top-0 bg-[#FCF9F6] border-b border-stone-200">
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                    Product Details
                  </th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                    Category
                  </th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                    Price
                  </th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                    Stock
                  </th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                    Status
                  </th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold text-right">
                    Management
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={() => handleEdit(product)}
                    onDelete={handleDelete}
                    onToggleArchive={handleArchive}
                    ref={index === products.length - 1 ? lastProductRef : null}
                  />
                ))}
              </tbody>
            </table>

            {scrollLoading && (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin text-amber-800" size={24} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Update Popover */}
      {editingProduct && (
        <ProductUpdatePopover
          productData={editingProduct}
          closing={closingModal}
          onClose={closeEditModal}
          onUpdated={() => loadProducts()}
        />
      )}

      {/* Create Popover */}
      {showCreatePopover && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
            <button
              type="button"
              onClick={() => setShowCreatePopover(false)}
              className="absolute top-2 right-2 text-stone-400 hover:text-stone-600"
            >
              ✕
            </button>
            <ProductCreate />
          </div>
        </div>
      )}
    </div>
  );
}