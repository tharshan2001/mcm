import React, { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, PackageOpen, AlertCircle } from "lucide-react";
import { fetchOrdersForScroll } from "../../service/order";
import OrderCard from "./OrderCard";

const PAGE_SIZE = 10;

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async (cursor = null) => {
    try {
      cursor ? setScrollLoading(true) : setLoading(true);

      const data = await fetchOrdersForScroll(cursor);

      if (cursor) {
        setOrders((prev) => {
          const existingIds = new Set(prev.map((o) => o.orderId));
          const newOrders = data.filter((o) => !existingIds.has(o.orderId));
          return [...prev, ...newOrders];
        });
      } else {
        setOrders(data);
      }

      if (data.length > 0) {
        setNextCursor(data[data.length - 1].orderId);
        setHasMore(data.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (_err) {
      setError("Cannot load orders at this time.");
      setHasMore(false);
    } finally {
      setLoading(false);
      setScrollLoading(false);
    }
  };

  const lastOrderRef = useCallback(
    (node) => {
      if (scrollLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && hasMore && !scrollLoading) {
            loadOrders(nextCursor);
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
        <h1 className="text-2xl font-serif text-stone-800 mb-6">Order Manager</h1>

        {error ? (
          <div className="bg-red-50 border-l-2 border-red-400 p-4 flex items-center gap-4 text-red-800 italic">
            <AlertCircle size={20} /> {error}
          </div>
        ) : orders.length === 0 && !loading ? (
          <div className="text-center py-32 bg-white border border-dashed border-stone-200">
            <PackageOpen size={48} className="mx-auto text-stone-200 mb-4" />
            <p className="font-serif italic text-stone-400">No orders found.</p>
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="bg-white overflow-y-auto max-h-[500px] border border-stone-200 rounded-md"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="sticky top-0 bg-[#FCF9F6] border-b border-stone-200">
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Order ID</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Customer</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Coupon</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Total Price</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Status</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Payment</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((order, index) => (
                  <OrderCard
                    key={order.orderId}
                    order={order}
                    ref={index === orders.length - 1 ? lastOrderRef : null}
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
    </div>
  );
}
