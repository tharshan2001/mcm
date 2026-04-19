import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const CouponCard = React.forwardRef(({ coupon, onEdit, onDelete }, ref) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "No expiry";
    return new Date(dateStr).toLocaleDateString();
  };

  const formatDiscount = () => {
    if (coupon.discountType === "PERCENTAGE") {
      return `${coupon.discountValue}%`;
    }
    return `LKR ${coupon.discountValue}`;
  };

  return (
    <tr ref={ref} className="hover:bg-[#FCF9F6] transition-colors">
      <td className="p-4 font-mono text-sm">
        {coupon.id}
      </td>

      <td className="p-4 font-mono text-sm font-bold">
        {coupon.code}
      </td>

      <td className="p-4 font-mono text-sm">
        {formatDiscount()}
      </td>

      <td className="p-4 font-mono text-sm">
        LKR {coupon.minOrderAmount || 0}
      </td>

      <td className="p-4 font-mono text-sm">
        {coupon.maxUsage || "Unlimited"}
      </td>

      <td className="p-4 font-mono text-sm">
        {formatDate(coupon.expiryDate)}
      </td>

      <td className="p-4">
        <span className={`px-2 py-1 text-xs rounded ${coupon.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {coupon.active ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="p-4 text-right flex gap-2 justify-end">
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-xs border border-stone-300 px-3 py-1 rounded hover:bg-stone-100"
        >
          <Pencil size={14} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 text-xs border border-red-300 px-3 py-1 rounded hover:bg-red-50 text-red-600"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </td>
    </tr>
  );
});

export default CouponCard;
