import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import Login from "./Login";
import Signup from "./Signup";
import { useAuthStore } from "../stores/authStore";
import CartDrawer from "../components/cart/CartDrawer";
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
    if (user) {
      if (user.roles?.includes("ADMIN")) {
        window.open("/admin", "_blank");
      } else {
        navigate("/account");
      }
    } else {
      openLogin();
    }
  };

  const cartCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-[#FCF9F6] border-b border-stone-200 sticky top-0 z-50">
      {/* Top banner */}
      <div className="lm:hidden bg-[#5C4033] text-stone-100 text-center py-2 text-[10px] sm:text-xs tracking-widest uppercase px-2">
        Authentic Hand-Woven Traditions • Free Shipping on Orders Over LKR 15000
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="relative flex items-center justify-between h-16 md:h-20">

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-700"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Logo LEFT */}
          <Link
            to="/"
            className="flex flex-col group transition-opacity hover:opacity-90"
          >
            <span className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#5C4033] leading-none tracking-[0.15em]">
              MCM
            </span>

            <span
              className="text-[15px] sm:text-l md:text-sm text-[#5C4033]/80 lowercase italic ml-6 sm:ml-8 md:ml-10 -mt-1"
              style={{ fontFamily: "cursive, serif" }}
            >
              handlooms
            </span>
          </Link>

          {/* CENTERED LINKS */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-10 text-sm font-medium uppercase text-stone-700">
            <Link to="/" className="hover:text-[#5C4033]">
              Home
            </Link>

            <Link to="/shop" className="hover:text-[#5C4033]">
              Shop All
            </Link>

            <Link to="/blog" className="hover:text-[#5C4033]">
              Blog
            </Link>

            <Link to="/about" className="hover:text-[#5C4033]">
              About Us
            </Link>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleUserClick}
              className="text-stone-700 hover:text-[#5C4033]"
            >
              <User size={22} />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-stone-700 hover:text-[#5C4033]"
            >
              <ShoppingBag size={22} />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-700 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FCF9F6]">
          <div className="flex flex-col px-6 py-4 space-y-4 text-sm uppercase font-medium text-stone-700">

            <Link to="/" onClick={closeMenu} className="hover:text-[#5C4033]">
              Home
            </Link>

            <Link to="/shop" onClick={closeMenu} className="hover:text-[#5C4033]">
              Shop All
            </Link>

            <Link to="/blog" onClick={closeMenu} className="hover:text-[#5C4033]">
              Blog
            </Link>

            <Link to="/about" onClick={closeMenu} className="hover:text-[#5C4033]">
              About Us
            </Link>

          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {isAuthOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative">
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

      {/* CART DRAWER */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;