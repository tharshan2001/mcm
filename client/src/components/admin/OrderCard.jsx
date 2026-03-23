import React from "react";
import { useNavigate } from "react-router-dom";
import { Package, Eye, Tag, ExternalLink } from "lucide-react";

const OrderCard = React.forwardRef(({ order }, ref) => {
  const navigate = useNavigate();

  const goToOrder = () => {
    navigate(`/admin/orders/${order.orderId}`);
  };

  const handleViewCustomer = (e) => {
    e.stopPropagation();
    navigate(`/admin/orders/${order.orderId}`);
  };

  return (
    <tr
      ref={ref}
      onClick={goToOrder}
      className="group border-b border-stone-100 transition-colors hover:bg-[#FCF9F6] bg-white cursor-pointer"
    >
      {/* Order Icon + ID */}
      <td className="py-4 pl-6 pr-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center p-2 text-stone-400">
            <Package size={18} strokeWidth={1.5} />
            <span className="text-[8px] mt-1 font-mono uppercase tracking-widest">
              {order.orderId}
            </span>
          </div>
        </div>
      </td>

      {/* Username */}
      <td className="px-4 py-4 font-mono text-sm">
        {order.username}
      </td>

      {/* Coupon */}
      <td className="px-4 py-4">
        {order.couponCode ? (
          <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded w-fit">
            <Tag size={12} />
            <span>{order.couponCode}</span>
          </div>
        ) : (
          <span className="text-xs text-stone-300">—</span>
        )}
      </td>

      {/* Total */}
      <td className="px-4 py-4 font-mono text-sm">
        <div>
          {order.discountAmount > 0 && (
              <span className="text-xs text-stone-400 line-through mr-2">
              LKR {(order.totalPrice + order.discountAmount).toFixed(2)}
            </span>
          )}
          <span className={order.discountAmount > 0 ? "text-green-600 font-semibold" : ""}>
            LKR {order.totalPrice?.toFixed(2)}
          </span>
        </div>
      </td>

      {/* Order Status */}
      <td className="px-4 py-4 font-mono text-sm">
        {order.orderStatus}
      </td>

      {/* Payment Status */}
      <td className="px-4 py-4 font-mono text-sm">
        {order.paymentStatus}
      </td>

      {/* Actions */}
      <td className="py-4 pl-4 pr-6">
        <button
          onClick={handleViewCustomer}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-500 bg-stone-50 hover:bg-[#5C4033] hover:text-white rounded-md transition-all border border-stone-200 hover:border-[#5C4033]"
        >
          <ExternalLink size={14} />
          View
        </button>
      </td>
    </tr>
  );
});

export default OrderCard;