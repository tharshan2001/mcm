import React, { useState, useEffect } from "react";
import CouponCard from "./CouponCard";
import CouponUpdatePopover from "./CouponUpdatePopover";
import CouponCreate from "./CouponCreate";
import { Loader2, Plus, PackageOpen, AlertCircle } from "lucide-react";
import { fetchCoupons, deleteCoupon } from "../../service/couponService";
import sweetAlert from "../../utils/sweetAlert";

export default function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingCoupon, setEditingCoupon] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [closingModal, setClosingModal] = useState(false);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const data = await fetchCoupons();
      setCoupons(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load coupons.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
  };

  const handleDelete = async (coupon) => {
    const result = await sweetAlert.deleteConfirm(coupon.code);
    if (!result.isConfirmed) return;
    try {
      await deleteCoupon(coupon.id);
      loadCoupons();
      sweetAlert.toast("Coupon deleted successfully!");
    } catch (err) {
      sweetAlert.error("Failed to delete coupon");
    }
  };

  const closeEditModal = () => {
    setClosingModal(true);
    setTimeout(() => {
      setEditingCoupon(null);
      setClosingModal(false);
    }, 300);
  };

  return (
    <div className="bg-stone-50 min-h-[700px] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-serif text-stone-800">
              Coupon Manager
            </h1>
            <p className="text-sm text-stone-500 mt-2">
              {coupons.length} Coupons
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-[#5C4033] text-white px-8 py-4 text-[8px] font-bold uppercase tracking-[0.2em]"
          >
            <Plus size={14} /> New Coupon
          </button>
        </div>

        {error ? (
          <div className="bg-red-50 border-l-2 border-red-400 p-4 flex items-center gap-4 text-red-800 italic">
            <AlertCircle size={20}/> {error}
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-32 bg-white border border-dashed border-stone-200">
            <PackageOpen size={48} className="mx-auto text-stone-200 mb-4"/>
            <p className="font-serif italic text-stone-400">
              No coupons available.
            </p>
          </div>
        ) : (
          <div className="bg-white overflow-y-auto max-h-[500px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="sticky top-0 bg-[#FCF9F6] border-b border-stone-200">
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">ID</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Code</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Discount</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Min Order</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Max Usage</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Expires</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Status</th>
                  <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold text-right">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {coupons.map((coupon) => (
                  <CouponCard
                    key={coupon.id}
                    coupon={coupon}
                    onEdit={() => handleEdit(coupon)}
                    onDelete={() => handleDelete(coupon)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-4">
            <Loader2 className="animate-spin text-amber-800" size={24}/>
          </div>
        )}
      </div>

      {editingCoupon && (
        <CouponUpdatePopover
          couponData={editingCoupon}
          closing={closingModal}
          onClose={closeEditModal}
          onUpdated={loadCoupons}
        />
      )}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-2 right-2 text-stone-400"
            >
              ✕
            </button>

            <CouponCreate
              onCreated={() => {
                setShowCreateModal(false);
                loadCoupons();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
