import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import api from '../../service/api'; // your axios instance

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/my/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-10 text-stone-400 italic font-serif">
        Loading order details...
      </div>
    );

  if (!order)
    return (
      <div className="text-center py-10 text-stone-400 italic font-serif">
        Order not found.
      </div>
    );

  const getStatusClasses = (status) => {
    return status === 'Delivered'
      ? 'bg-green-50 text-green-700'
      : 'bg-amber-50 text-amber-700';
  };

  return (
    <div className="p-10 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-amber-800 text-xs font-bold uppercase tracking-widest border-b border-amber-800"
      >
        Back to Orders
      </button>

      <div className="bg-white p-5 border border-stone-200 rounded flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="p-2 bg-stone-50 text-stone-400">
            <Package size={24} />
          </div>
          <div>
            <p className="font-medium text-stone-900 text-sm">Order #{order.orderId}</p>
            <p className="text-[10px] text-stone-500 uppercase">
              {new Date(order.orderDate).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
        <span
          className={`text-[10px] font-bold px-3 py-1 rounded-full ${getStatusClasses(
            order.orderStatus === 'PLACED' ? 'In Transit' : order.orderStatus
          )}`}
        >
          {order.orderStatus === 'PLACED' ? 'In Transit' : order.orderStatus}
        </span>
      </div>

      <div className="space-y-4 mt-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 bg-stone-50 border border-stone-200 rounded group hover:border-amber-200 transition-colors"
          >
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium text-stone-900">{item.product.name}</p>
              <p className="text-[10px] text-stone-500">Qty: {item.quantity}</p>
              <p className="text-[10px] text-stone-500">Price: ${item.price.toFixed(2)}</p>
            </div>
            <div className="font-bold text-stone-900">${item.subTotal.toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="text-right mt-4 font-serif font-bold text-stone-900 text-lg">
        Total: ${order.totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default OrderDetail;