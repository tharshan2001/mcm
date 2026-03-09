import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = React.forwardRef(({ order }, ref) => {
  const navigate = useNavigate();

  const handleView = (e) => {
    e.stopPropagation();
    navigate(`/orders/${order.orderId}`);
  };

  return (
    <tr
      ref={ref}
      className="hover:bg-[#FCF9F6] transition-colors"
    >
      <td className="p-4 font-mono text-sm">{order.orderId}</td>

      <td className="p-4 font-mono text-sm">{order.username}</td>

      {/* <td className="p-4 font-mono text-sm">{order.shippingAddress}</td> */}

      <td className="p-4 font-mono text-sm">
        ${order.totalPrice?.toFixed(2)}
      </td>

      <td className="p-4 font-mono text-sm">{order.orderStatus}</td>

      <td className="p-4 font-mono text-sm">{order.paymentStatus}</td>

      <td className="p-4 text-right">
        <button
          onClick={handleView}
          className="text-xs border border-stone-300 px-3 py-1 rounded hover:bg-stone-100"
        >
          View
        </button>
      </td>
    </tr>
  );
});

export default OrderCard;