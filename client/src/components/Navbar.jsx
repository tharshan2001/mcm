import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Search, Menu, X, Heart } from "lucide-react";
import Login from "./Login";
import Signup from "./Signup";
import { useAuthStore } from "../stores/authStore";
import CartDrawer from "./CartDrawer";
import { useCartStore } from "../stores/cartStore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const {
    user,
    fetchUser,
    isAuthOpen,
    showLogin,
    openLogin,
    openSignup,
    closeAuth,
  } = useAuthStore();

  const { cart, fetchCart } = useCartStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) fetchUser();
  }, [user, fetchUser]);

  useEffect(() => {
    if (user) fetchCart(user.id);
  }, [user, fetchCart]);

  const handleUserClick = () => {
    if (user) navigate("/account");
    else openLogin();
  };

  const cartCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav className="bg-[#FCF9F6] border-b border-stone-200 sticky top-0 z-50">
      <div className="bg-[#5C4033] text-stone-100 text-center py-2 text-xs tracking-widest uppercase">
        Authentic Hand-Woven Traditions • Free Shipping on Orders Over $150
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase">
            <Link to="/shop">Shop All</Link>
            <Link to="/material">Material</Link>
            <Link to="/about">About us</Link>
          </div>

          <Link
            to="/"
            className="text-2xl md:text-3xl font-serif font-bold text-[#5C4033]"
          >
            LOOM<span className="italic">&</span>CRAFT
          </Link>

          <div className="flex items-center space-x-4">
            <button onClick={handleUserClick}>
              <User size={20} />
            </button>

            <button onClick={() => setIsCartOpen(true)} className="relative">
              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-700 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AUTH MODAL */}
      {isAuthOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-6 w-80 relative">
            <button
              onClick={closeAuth}
              className="absolute top-3 right-3 text-stone-600"
            >
              <X size={18} />
            </button>

            {showLogin ? (
              <Login switchToSignup={openSignup} />
            ) : (
              <Signup switchToLogin={openLogin} />
            )}
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;