import React from 'react';
import { Package, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusMap = {
  PLACED: { label: 'Placed', bg: 'bg-amber-50', text: 'text-amber-700' },
  SHIPPED: { label: 'Shipped', bg: 'bg-blue-50', text: 'text-blue-700' },
  DELIVERED: { label: 'Delivered', bg: 'bg-green-50', text: 'text-green-700' },
  CANCELLED: { label: 'Cancelled', bg: 'bg-red-50', text: 'text-red-700' },
};

const OrderRow = ({ order }) => {
  const navigate = useNavigate();

  const statusInfo = statusMap[order.status] || { label: order.status, bg: 'bg-amber-50', text: 'text-amber-700' };

  return (
    <div
      onClick={() => navigate(`/orders/${order.rawId}`)}
      className="bg-white p-4 border border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4 group hover:border-stone-300 transition-colors cursor-pointer rounded-lg"
    >
      <div className="flex gap-4 items-center">
        <div className="p-2 bg-stone-50 text-stone-400 rounded">
          <Package size={20} />
        </div>
        <div>
          <p className="font-medium text-stone-900 text-sm">{order.id}</p>
          <p className="text-xs text-stone-500 uppercase">{order.date}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {order.couponCode && (
          <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
            <Tag size={12} />
            <span>{order.couponCode}</span>
          </div>
        )}
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusInfo.bg} ${statusInfo.text}`}>
          {statusInfo.label}
        </span>
        <div className="text-right">
          {order.discountAmount > 0 && (
            <p className="text-xs text-stone-400 line-through">{order.originalTotal}</p>
          )}
          <p className="font-serif font-bold text-stone-900">{order.total}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderRow;