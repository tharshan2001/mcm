import React from 'react';
import { Package, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusMap = {
  PLACED: { label: 'PLACED', color: 'amber' },
  SHIPPED: { label: 'Shipped', color: 'blue' },
  DELIVERED: { label: 'Delivered', color: 'green' },
  CANCELLED: { label: 'Cancelled', color: 'red' },
};

const OrderRow = ({ order }) => {
  const navigate = useNavigate();

  const statusInfo = statusMap[order.status] || { label: order.status, color: 'amber' };
  const bgColor = `bg-${statusInfo.color}-50`;
  const textColor = `text-${statusInfo.color}-700`;

  return (
    <div
      onClick={() => navigate(`/orders/${order.rawId}`)}
      className="bg-white p-5 border border-stone-200 flex justify-between items-center group hover:border-amber-200 transition-colors cursor-pointer"
    >
      <div className="flex gap-4 items-center">
        <div className="p-2 bg-stone-50 text-stone-400">
          <Package size={20} />
        </div>
        <div>
          <p className="font-medium text-stone-900 text-sm">{order.id}</p>
          <p className="text-[10px] text-stone-500 uppercase">{order.date}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        {order.couponCode && (
          <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
            <Tag size={12} />
            <span>{order.couponCode}</span>
          </div>
        )}
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${bgColor} ${textColor}`}>
          {statusInfo.label}
        </span>
        <div className="text-right">
          {order.discountAmount > 0 && (
            <p className="text-[10px] text-stone-400 line-through">{order.originalTotal}</p>
          )}
          <p className="font-serif font-bold text-stone-900">{order.total}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderRow;