import React, { useState } from "react";
import { createCoupon } from "../../service/couponService";

export default function CouponCreate({ onCreated }) {
  const [formData, setFormData] = useState({
    code: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    minOrderAmount: "",
    maxUsage: "",
    expiryDate: "",
    active: true,
    description: ""
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
      await createCoupon({
        ...formData,
        discountValue: parseFloat(formData.discountValue),
        minOrderAmount: parseFloat(formData.minOrderAmount),
        maxUsage: parseInt(formData.maxUsage)
      });
      onCreated();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-serif text-[#5C4033]">
        Create Coupon
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider mb-1">Code</label>
          <input
            type="text"
            name="code"
            placeholder="SUMMER20"
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
            placeholder="20"
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
            placeholder="100"
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
            placeholder="100"
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
          placeholder="20% off orders above LKR 10000"
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
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
