import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OrderRow from './OrderRow';
import api from '../../service/api'; 

const OrdersList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/my');
        const data = response.data;

        // Pass raw API status to OrderRow, let OrderRow handle the mapping
        const formattedOrders = data.map(order => ({
          rawId: order.orderId,
          id: `#LC-${order.orderId}`,
          date: new Date(order.orderDate).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }),
          status: order.orderStatus,
          couponCode: order.couponCode || null,
          discountAmount: order.discountAmount || 0,
          originalTotal: order.discountAmount > 0 
            ? `LKR ${(order.totalPrice + order.discountAmount).toFixed(2)}`
            : null,
          total: `LKR ${order.totalPrice.toFixed(2)}`,
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 text-stone-400 italic font-serif">
        Loading your orders...
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="text-center py-10 text-stone-400 italic font-serif">
        You have no orders yet.
      </div>
    );

  return (
    <div className="space-y-4 overflow-y-auto max-h-[500px] p-10 pt-3">
      <h3 className="text-lg font-serif text-[#5C4033] mb-4 z-55 absolute top-70">
        My Purchases
      </h3>

      {orders.map(order => (
        <OrderRow key={order.id} order={order} />
      ))}

      <div className="mt-10 p-10 border border-dashed border-stone-200 text-center bg-white/50">
        <ShoppingCart size={24} className="mx-auto text-stone-300 mb-3" />
        <p className="text-sm text-stone-500 italic">Ready for your next find?</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-3 text-amber-800 text-xs font-bold uppercase tracking-widest border-b border-amber-800"
        >
          Shop The Collection
        </button>
      </div>
    </div>
  );
};

export default OrdersList;