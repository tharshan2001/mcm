import React, { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { fetchCustomersForScroll, deleteCustomer } from "../../service/userService";
import CustomerCard from "./CustomerCard";
import CustomerUpdateModal from "./CustomerUpdateModal";
import sweetAlert from "../../utils/sweetAlert";

const PAGE_SIZE = 10;

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [editModal, setEditModal] = useState({ isOpen: false, customerId: null });

  const observer = useRef();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async (cursor = null) => {
    try {
      cursor ? setScrollLoading(true) : setLoading(true);
      const data = await fetchCustomersForScroll(cursor, PAGE_SIZE);

      if (cursor) {
        setCustomers((prev) => {
          const existingIds = new Set(prev.map((c) => c.id));
          const newCustomers = data.filter((c) => !existingIds.has(c.id));
          return [...prev, ...newCustomers];
        });
      } else {
        setCustomers(data);
      }

      if (data.length > 0) {
        setNextCursor(data[data.length - 1].id);
        setHasMore(data.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setError("Cannot load customers at this time.");
      setHasMore(false);
    } finally {
      setLoading(false);
      setScrollLoading(false);
    }
  };

  const handleEdit = (customer) => {
    setEditModal({ isOpen: true, customerId: customer.id });
  };

  const handleDelete = async (customer) => {
    const result = await sweetAlert.deleteConfirm(customer.fullName);
    if (!result.isConfirmed) return;
    try {
      await deleteCustomer(customer.id);
      setCustomers((prev) => prev.filter((c) => c.id !== customer.id));
      sweetAlert.toast("Customer deleted successfully!");
    } catch (error) {
      sweetAlert.error(error.response?.data?.message || "Failed to delete customer");
    }
  };

  const handleUpdateSuccess = () => {
    loadCustomers();
  };

  const lastCustomerRef = useCallback(
    (node) => {
      if (scrollLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && hasMore && !scrollLoading) {
            loadCustomers(nextCursor);
          }
        },
        { root: scrollContainerRef.current, threshold: 0.1 }
      );

      if (node) observer.current.observe(node);
    },
    [scrollLoading, hasMore, nextCursor]
  );

  return (
    <div className="bg-stone-50 min-h-[700px] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-serif text-stone-800 mb-6">Customer Manager</h1>

        {error ? (
          <div className="bg-red-50 border-l-2 border-red-400 p-4 flex items-center gap-4 text-red-800 italic">
            <AlertCircle size={20} /> {error}
          </div>
        ) : customers.length === 0 && !loading ? (
          <div className="text-center py-32 bg-white border border-dashed border-stone-200">
            <p className="font-serif italic text-stone-400">No customers found.</p>
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="bg-white overflow-y-auto max-h-[500px] border border-stone-200 rounded-md"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="sticky top-0 bg-[#FCF9F6] border-b border-stone-200">
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">ID</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Name</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Email</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Address</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {customers.map((customer, index) => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    ref={index === customers.length - 1 ? lastCustomerRef : null}
                  />
                ))}
              </tbody>
            </table>

            {(loading || scrollLoading) && (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin text-amber-800" size={24} />
              </div>
            )}
          </div>
        )}
      </div>

      <CustomerUpdateModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, customerId: null })}
        customerId={editModal.customerId}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  );
}