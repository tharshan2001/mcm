import React from "react";
import { useNavigate } from "react-router-dom";
import { Package, Eye } from "lucide-react";

const OrderCard = React.forwardRef(({ order }, ref) => {
  const navigate = useNavigate();

  const goToOrder = () => {
    navigate(`/admin/orders/${order.orderId}`);
  };

  const handleView = (e) => {
    e.stopPropagation();
    navigate(`/orders/${order.orderId}`);
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

      {/* Total */}
      <td className="px-4 py-4 font-mono text-sm">
        ${order.totalPrice?.toFixed(2)}
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
      <td className="py-4 pl-4 pr-6 text-right">
        <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

          <button
            onClick={handleView}
            className="flex flex-col items-center p-2 text-stone-400 hover:text-[#5C4033] hover:bg-white rounded-full transition-all"
            title="View Order"
          >
            <Eye size={16} strokeWidth={1.5} />
            <span className="text-[8px] mt-1 font-mono uppercase tracking-widest">
              View
            </span>
          </button>

        </div>
      </td>
    </tr>
  );
});

export default OrderCard;