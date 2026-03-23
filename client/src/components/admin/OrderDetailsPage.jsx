import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../service/order";
import OrderItemCard from "../admin/OrderItemCard";
import { 
  Package, 
  CreditCard, 
  MapPin, 
  Calendar, 
  User, 
  ChevronLeft, 
  Loader2,
  Tag,
  DollarSign
} from "lucide-react";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    setLoading(true);
    try {
      const data = await getOrderById(orderId);
      setOrder(data);
    } catch (error) {
      console.error("Failed to load order", error);
    } finally {
      setLoading(false);
    }
  };

  // Status Color Helper
  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("delivered") || s.includes("completed")) return "bg-green-100 text-green-800";
    if (s.includes("processing") || s.includes("shipped")) return "bg-blue-100 text-blue-800";
    if (s.includes("cancelled")) return "bg-red-100 text-red-800";
    return "bg-amber-100 text-amber-800"; // default/pending
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-stone-500 bg-stone-50">
        <Loader2 className="animate-spin text-stone-400" size={32} strokeWidth={1.5} />
        <p className="text-sm text-stone-500">Loading...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-stone-50">
        <p className="text-stone-500 mb-4">Order not found</p>
        <button onClick={() => navigate(-1)} className="text-sm text-stone-600 hover:text-stone-800 transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-[700px] p-4 md:p-8 text-stone-800">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 -ml-2 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <Package size={24} className="text-stone-600" strokeWidth={1.5} />
                <h1 className="text-2xl font-serif text-stone-800">
                  Order #{order.orderId}
                </h1>
              </div>
              <p className="text-sm text-stone-500 mt-1">
                Placed on {new Date(order.orderDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <div className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center justify-center ${getStatusColor(order.orderStatus)}`}>
            {order.orderStatus}
          </div>
        </div>

        {/* Order Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Customer Block */}
          <div className="bg-white p-4 rounded-lg border border-stone-200 flex items-start gap-3">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-600 shrink-0">
              <User size={18} strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-xs text-stone-400 uppercase tracking-wider block mb-1">Customer</span>
              <p className="text-sm font-medium text-stone-800">{order.username}</p>
            </div>
          </div>

          {/* Payment Block */}
          <div className="bg-white p-4 rounded-lg border border-stone-200 flex items-start gap-3">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-600 shrink-0">
              <CreditCard size={18} strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-xs text-stone-400 uppercase tracking-wider block mb-1">Payment</span>
              <p className="text-sm font-medium text-stone-800 capitalize">{order.paymentStatus}</p>
              <p className="text-lg font-semibold text-stone-800 mt-1">
                LKR {Number(order.totalPrice).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Coupon Block */}
          {order.couponCode && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg text-green-600 shrink-0">
                <Tag size={18} strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-xs text-green-600 uppercase tracking-wider block mb-1">Coupon</span>
                <p className="text-sm font-semibold text-green-800">{order.couponCode}</p>
                <p className="text-xs font-medium text-green-600 mt-1">
                  -LKR {order.discountAmount?.toFixed(2)} saved
                </p>
              </div>
            </div>
          )}

          {/* Shipping Block */}
          <div className={`bg-white p-4 rounded-lg border border-stone-200 flex items-start gap-3 ${!order.couponCode ? 'lg:col-span-1 md:col-span-2' : ''}`}>
            <div className="p-2 bg-stone-100 rounded-lg text-stone-600 shrink-0">
              <MapPin size={18} strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-xs text-stone-400 uppercase tracking-wider block mb-1">Delivery</span>
              <p className="text-sm text-stone-600 leading-relaxed">
                {order.shippingAddress || "No address"}
              </p>
            </div>
          </div>

        </div>

        {/* Order Items Section */}
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-stone-100 bg-stone-50">
            <h2 className="text-sm font-medium text-stone-600">
              Purchased Items ({order.items?.length || 0})
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {order.items?.length > 0 ? (
              order.items.map((item, index) => (
                <OrderItemCard key={index} item={item} />
              ))
            ) : (
              <p className="text-center text-stone-400 italic font-serif py-4">No items found in this order.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsPage;