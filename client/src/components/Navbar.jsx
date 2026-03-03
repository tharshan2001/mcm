import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Search, Menu, X, Heart } from "lucide-react";
import Login from "./Login";
import Signup from "./Signup";
import { useAuthStore } from "../stores/authStore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  const navigate = useNavigate();

  // Ensure we know if user is logged in
  useEffect(() => {
    if (!user) fetchUser();
  }, [user, fetchUser]);

  // Close auth modal automatically when user logs in
  useEffect(() => {
    if (user) {
      setIsAuthOpen(false);
    }
  }, [user]);

  const handleUserClick = () => {
    if (user) {
      navigate("/account");
    } else {
      setIsAuthOpen(true);
      setShowLogin(true);
    }
  };

  return (
    <nav className="bg-[#FCF9F6] border-b border-stone-200 sticky top-0 z-50">
      <div className="bg-[#5C4033] text-stone-100 text-center py-2 text-xs tracking-widest uppercase">
        Authentic Hand-Woven Traditions • Free Shipping on Orders Over $150
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-700 hover:text-amber-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-700 uppercase tracking-wider">
            <Link
              to="/shop-all"
              className="hover:text-amber-800 transition-colors"
            >
              Shop All
            </Link>
            <Link
              to="/material"
              className="hover:text-amber-800 transition-colors"
            >
              Material
            </Link>
            <Link
              to="/interior"
              className="hover:text-amber-800 transition-colors"
            >
              Interior
            </Link>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-serif font-bold text-[#5C4033] tracking-tighter cursor-pointer"
            >
              LOOM<span className="font-light italic">&</span>CRAFT
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3 md:space-x-6">
            <Link
              to="/search"
              className="hidden sm:block text-stone-700 hover:text-amber-800"
            >
              <Search size={20} strokeWidth={1.5} />
            </Link>

            {/* User Icon opens modal or navigates to account */}
            <button
              onClick={handleUserClick}
              className="hidden sm:block text-stone-700 hover:text-amber-800"
            >
              <User size={20} strokeWidth={1.5} />
            </button>

            <Link
              to="/wishlist"
              className="text-stone-700 hover:text-amber-800"
            >
              <Heart size={20} strokeWidth={1.5} />
            </Link>

            <Link
              to="/cart"
              className="text-stone-700 hover:text-amber-800 relative"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-2 bg-amber-700 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-4 text-center">
            <Link
              to="/shop-all"
              className="block text-lg font-medium text-stone-800 py-2 border-b"
            >
              Shop All
            </Link>
            <Link
              to="/material"
              className="block text-lg font-medium text-stone-800 py-2 border-b"
            >
              Material
            </Link>
            <Link
              to="/interior"
              className="block text-lg font-medium text-stone-800 py-2 border-b"
            >
              Interior
            </Link>
          </div>
        </div>
      )}

      {/* Centered Auth Modal */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl relative animate-in fade-in duration-200">
            <button
              className="absolute top-3 right-3 text-stone-600 hover:text-amber-800"
              onClick={() => setIsAuthOpen(false)}
            >
              <X size={18} />
            </button>

            {showLogin ? (
              <Login switchToSignup={() => setShowLogin(false)} />
            ) : (
              <Signup switchToLogin={() => setShowLogin(true)} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;