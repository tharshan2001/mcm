import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, CheckCircle2, X, ShoppingCart, Tag, MapPin, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import { useAddressStore } from "../../stores/addressStore";
import AddressSelectModal from "../address/AddressSelectModal";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY); 

const CARD_OPTIONS = {
  style: {
    base: {
      fontFamily: 'inherit',
      fontSize: '15px',
      color: '#292524', 
      '::placeholder': { color: '#A8A29E' },
    },
  },
};

function CheckoutForm({ cart, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { addresses, fetchAddresses } = useAddressStore();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [couponCode, setCouponCode] = useState("");

  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find(a => a.isDefault);
      setSelectedAddress(defaultAddr || addresses[0]);
    }
  }, [addresses]);

  useEffect(() => {
    if (addresses && addresses.length === 0) {
      navigate("/account");
    }
  }, [addresses, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !selectedAddress) return;

    setStatus('processing');
    setErrorMsg(null);

    const couponCodeToUse = couponCode.trim() || null;

    try {
      const { data } = await api.post("/orders/pay", null, {
        params: { couponCode: couponCodeToUse }
      });

      const { clientSecret, paymentId } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { 
          card: elements.getElement(CardElement) 
        },
      });

      if (result.error) {
        setErrorMsg(result.error.message);
        setStatus('idle');
      } else if (result.paymentIntent.status === "succeeded") {
        await api.post("/orders/checkout", null, { 
          params: { 
            addressId: selectedAddress.id,
            paymentIntentId: paymentId,
            couponCode: couponCodeToUse
          } 
        });

        setStatus('success');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Transaction failed.");
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-stone-800 mb-1">Order Placed!</h3>
        <p className="text-sm text-stone-500 mb-6">Thank you for your purchase</p>
        <button onClick={onClose} className="text-sm text-stone-600 hover:text-stone-800 font-medium">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handlePayment} className="space-y-5">
        {/* Delivery Address */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
            Delivery Address
          </label>
          
          <div
            onClick={() => setIsAddressModalOpen(true)}
            className="p-3 border border-stone-200 rounded-lg cursor-pointer hover:border-stone-400 transition-colors bg-white"
          >
            {selectedAddress ? (
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-stone-800">
                    {selectedAddress.fullName}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {selectedAddress.addressLine}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.postalCode}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-stone-400">Select address</p>
            )}
          </div>
          
          <button
            type="button"
            onClick={() => navigate("/account")}
            className="text-xs text-[#5C4033] hover:underline"
          >
            + Add new address
          </button>
        </div>

        {/* Promo Code */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
            Promo Code
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="w-full border border-stone-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#5C4033] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-stone-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">Subtotal</span>
            <span className="text-stone-700">LKR {cart.totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">Shipping</span>
            <span className="text-stone-500">Free</span>
          </div>
          <div className="border-t border-stone-200 pt-2 flex justify-between">
            <span className="font-medium text-stone-700">Total</span>
            <span className="font-semibold text-lg text-[#5C4033]">LKR {cart.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-stone-500 uppercase tracking-wider flex items-center gap-2">
            <CreditCard size={14} />
            Card Details
          </label>
          <div className="p-3 bg-white border border-stone-200 rounded-lg focus-within:border-[#5C4033] transition-colors">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || status === 'processing' || !selectedAddress}
          className="w-full py-3 bg-[#5C4033] text-white font-medium rounded-lg hover:bg-[#4A332A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'processing' ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Processing...
            </>
          ) : (
            `Pay LKR ${cart.totalPrice.toFixed(2)}`
          )}
        </button>

        <p className="text-xs text-center text-stone-400">
          Secure payment powered by Stripe
        </p>
      </form>

      <AddressSelectModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        selectedId={selectedAddress?.id}
        onSelect={(addr) => {
          setSelectedAddress(addr);
          setIsAddressModalOpen(false);
        }}
      />
    </>
  );
}

export default function CheckoutModal({ isOpen, onClose, cart }) {
  if (!isOpen || !cart) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl z-10 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#5C4033] px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Checkout</h2>
            <button onClick={onClose} className="text-white/70 hover:text-white p-1">
              <X size={20} />
            </button>
          </div>
          <p className="text-white/60 text-sm mt-1">Complete your order</p>
        </div>

        {/* Cart Items Preview */}
        <div className="px-6 py-3 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-stone-200 rounded-lg overflow-hidden">
              {cart.items?.[0]?.product?.images?.[0] ? (
                <img src={cart.items[0].product.images[0]} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">
                  <ShoppingCart size={16} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-stone-800 line-clamp-1">{cart.items?.length || 0} item(s) in cart</p>
              <p className="text-sm text-stone-500">LKR {cart.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="p-6">
          <Elements stripe={stripePromise}>
            <CheckoutForm cart={cart} onClose={onClose} />
          </Elements>
        </div>
      </div>
    </div>
  );
}