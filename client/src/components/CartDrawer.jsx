// src/components/CartDrawer.jsx
import React, { useEffect, useState } from "react";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "../stores/cartStore";
import CheckoutModal from "./CheckoutModal"; // import the modal component

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, fetchCart, increaseItem, decreaseItem, loading } = useCartStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Load cart on mount or drawer open
  useEffect(() => {
    if (isOpen) {
      fetchCart();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsCheckoutOpen(false); // close checkout modal if drawer closes
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleIncrease = (productId) => increaseItem(productId);
  const handleDecrease = (productId) => decreaseItem(productId);
  const handleRemove = (productId) => {
    const item = cart.items.find((i) => i.product.id === productId);
    if (item) decreaseItem(productId);
  };

  const handleCheckoutClick = () => {
    // Close drawer first
    onClose();
    // Open modal after drawer closes
    setTimeout(() => setIsCheckoutOpen(true), 0);
  };

  const subtotal = cart?.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  return (
    <>
      {/* Dark Overlay */}
      <div
        className={`fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Right Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#FCF9F6] shadow-2xl z-50 flex flex-col transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-stone-200 bg-white">
          <h2 className="text-2xl font-serif text-[#5C4033] flex items-center gap-3">
            <ShoppingBag strokeWidth={1.5} /> My tote
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-colors"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {loading ? (
            <p className="text-center text-stone-500">Loading...</p>
          ) : !cart?.items?.length ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-4">
              <ShoppingBag size={48} strokeWidth={1} className="text-stone-300" />
              <p className="font-serif italic">Your tote is currently empty.</p>
              <button
                onClick={onClose}
                className="text-xs font-bold uppercase tracking-widest text-amber-800 border-b border-amber-800 pb-1"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.items.map((item) => {
              const imageUrl = item.product.images?.[0] || "https://via.placeholder.com/200";
              return (
                <div key={item.product.id} className="flex gap-4 group">
                  {/* Image */}
                  <div className="w-24 h-32 flex-shrink-0 bg-stone-100 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-stone-800 text-lg leading-tight pr-4">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => handleRemove(item.product.id)}
                        className="text-stone-400 hover:text-red-700 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-1">
                      {item.product.material || "N/A"}
                    </p>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border border-stone-200 bg-white">
                        <button
                          onClick={() => handleDecrease(item.product.id)}
                          className="p-2 text-stone-500 hover:text-amber-800 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(item.product.id)}
                          className="p-2 text-stone-500 hover:text-amber-800 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-medium text-stone-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart?.items?.length > 0 && (
          <div className="border-t border-stone-200 bg-white p-6 space-y-4">
            <div className="flex justify-between items-center text-stone-800">
              <span className="font-serif text-lg">Subtotal</span>
              <span className="font-serif text-xl font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-stone-500 font-light italic">
              Taxes and shipping calculated at checkout.
            </p>
            <button
              onClick={handleCheckoutClick}
              className="w-full bg-[#5C4033] text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-amber-900 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Centered Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
      />
    </>
  );
};

export default CartDrawer;