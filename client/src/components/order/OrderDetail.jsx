import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, Tag, ArrowLeft } from 'lucide-react';
import api from '../../service/api';

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
        className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-widest border-b border-amber-800 hover:opacity-70 transition-opacity"
      >
        <ArrowLeft size={14} />
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

      {order.couponCode && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <Tag size={16} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">
              Coupon Applied: {order.couponCode}
            </p>
            {order.couponDescription && (
              <p className="text-xs text-green-600">{order.couponDescription}</p>
            )}
            <p className="text-sm font-bold text-green-700">
              You saved LKR {order.discountAmount?.toFixed(2)}!
            </p>
          </div>
        </div>
      )}

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
              <p className="text-[10px] text-stone-500">Price: LKR {item.price.toFixed(2)}</p>
            </div>
            <div className="font-bold text-stone-900">LKR {item.subTotal.toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Subtotal</span>
          <span className="text-stone-900">LKR {(order.totalPrice + order.discountAmount).toFixed(2)}</span>
        </div>
        {order.discountAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Discount</span>
            <span className="text-green-600">-LKR {order.discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-serif font-bold pt-2 border-t border-stone-200">
          <span className="text-stone-900">Total</span>
          <span className="text-[#5C4033]">LKR {order.totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;