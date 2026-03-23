import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, CheckCircle2, X, ShoppingCart, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import { useAddressStore } from "../../stores/addressStore";
import AddressSelectModal from "../address/AddressSelectModal";

const stripePromise = loadStripe("pk_test_51SICd4GZ35ZW82pcF0GVf50ItTlBwkTZ014Ml7cS1ruWR8TDRUCgepT5CDAMK77Whxab6wzBdppHy2GpZknNLVgX00RAIfbqRJ"); 

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

  // Fetch addresses
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // Auto select default
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find(a => a.isDefault);
      setSelectedAddress(defaultAddr || addresses[0]);
    }
  }, [addresses]);

  // Redirect if no address
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
      <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
          <CheckCircle2 size={32} className="text-white" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-serif text-[#5C4033] mb-2">Acquisition Complete</h3>
        <p className="text-stone-500 text-sm mb-8 italic">Your order is now being prepared.</p>
        <button onClick={onClose} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5C4033] border-b border-[#5C4033] pb-1 hover:opacity-60 transition-opacity">
          Back to Archive
        </button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handlePayment} className="space-y-6 animate-in fade-in duration-500">

        {/* ✅ Address Selector with mini "+ Add New" */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
              Delivery Address
            </span>

            {/* Mini Add Button */}
            <button
              type="button"
              onClick={() => navigate("/account")}
              className="text-[9px] uppercase tracking-widest text-[#5C4033] border-b border-[#5C4033] pb-[1px] hover:opacity-60 transition"
            >
              + Add New
            </button>
          </div>

          <div
            onClick={() => setIsAddressModalOpen(true)}
            className="p-4 border border-stone-200 cursor-pointer hover:border-[#5C4033] transition"
          >
            {selectedAddress ? (
              <>
                <p className="text-sm text-stone-700 font-medium">
                  {selectedAddress.fullName}
                </p>
                <p className="text-xs text-stone-400">
                  {selectedAddress.addressLine}, {selectedAddress.city}
                </p>
              </>
            ) : (
              <p className="text-xs text-stone-400 italic">
                Select an address
              </p>
            )}
          </div>
        </div>

        {/* Payment */}
        <div className="space-y-4">
          {/* Coupon Input */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
              Promo Code
            </span>
            <div className="relative">
              <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Enter code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="w-full border border-stone-200 pl-9 p-2 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-between items-end border-b border-stone-200 pb-2">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
              Total Amount
            </span>
            <span className="text-2xl font-serif text-[#5C4033]">
              ${cart.totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="p-4 bg-white border border-stone-200 shadow-sm focus-within:border-[#5C4033] transition-colors">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-[11px] border-l-2 border-red-500">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || status === 'processing'}
          className="w-full py-4 bg-[#5C4033] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-all disabled:opacity-50 flex justify-center items-center gap-3"
        >
          {status === 'processing'
            ? <Loader2 size={16} className="animate-spin" />
            : "Complete Purchase"}
        </button>
      </form>

      {/* ✅ Address Modal */}
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
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-[#FCF9F6] w-full max-w-md p-8 relative shadow-2xl border border-stone-200 z-10 animate-in slide-in-from-bottom-4 duration-500">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 p-2">
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Cart Animation */}
        <div className="relative h-20 w-full flex items-center justify-center mb-8 overflow-hidden group">
          <div className="absolute bottom-4 w-full h-[2px] bg-stone-200">
            <div className="absolute inset-0 flex justify-around opacity-30">
              {[...Array(6)].map((_, i) => <div key={i} className="w-4 h-full bg-white" />)}
            </div>
          </div>
          
          <div className="absolute bottom-5 animate-cart-fast flex flex-col items-center">
            <ShoppingCart size={28} className="text-[#5C4033]" strokeWidth={1.2} />
            <div className="w-4 h-1 bg-stone-900/10 rounded-full blur-[1px] mt-1" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif text-[#5C4033]">Checkout</h2>
          <p className="text-[9px] uppercase tracking-[0.3em] text-stone-400 mt-1">
            Finalizing Your Acquisition
          </p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm cart={cart} onClose={onClose} />
        </Elements>
      </div>
    </div>
  );
}