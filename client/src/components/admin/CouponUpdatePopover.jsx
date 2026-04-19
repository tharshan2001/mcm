import React, { useState } from "react";
import { updateCoupon } from "../../service/couponService";

export default function CouponUpdatePopover({ couponData, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    code: couponData.code || "",
    discountType: couponData.discountType || "PERCENTAGE",
    discountValue: couponData.discountValue || "",
    minOrderAmount: couponData.minOrderAmount || "",
    maxUsage: couponData.maxUsage || "",
    expiryDate: couponData.expiryDate ? couponData.expiryDate.slice(0, 16) : "",
    active: couponData.active ?? true,
    description: couponData.description || ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCoupon(couponData.id, {
        ...formData,
        discountValue: parseFloat(formData.discountValue),
        minOrderAmount: parseFloat(formData.minOrderAmount) || 0,
        maxUsage: parseInt(formData.maxUsage) || 0
      });
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-stone-400">
          ✕
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-serif text-[#5C4033]">
            Edit Coupon
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider mb-1">Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full border p-2"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider mb-1">Discount Type</label>
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="w-full border p-2"
              >
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed Amount</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider mb-1">Discount Value</label>
              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                className="w-full border p-2"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider mb-1">Min Order Amount</label>
              <input
                type="number"
                name="minOrderAmount"
                value={formData.minOrderAmount}
                onChange={handleChange}
                className="w-full border p-2"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider mb-1">Max Usage</label>
              <input
                type="number"
                name="maxUsage"
                value={formData.maxUsage}
                onChange={handleChange}
                className="w-full border p-2"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider mb-1">Expiry Date</label>
              <input
                type="datetime-local"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full border p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm">Active</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#5C4033] text-white px-4 py-2 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
