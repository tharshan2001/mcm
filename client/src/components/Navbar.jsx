import React, { useState } from 'react';
import { ShoppingBag, User, Search, Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#FCF9F6] border-b border-stone-200 sticky top-0 z-50">
      {/* Top Thin Banner */}
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

          {/* Left: Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-700 uppercase tracking-wider">
            <a href="#" className="hover:text-amber-800 transition-colors">Shop All</a>
            <a href="#" className="hover:text-amber-800 transition-colors">Sarees</a>
            <a href="#" className="hover:text-amber-800 transition-colors">Home Decor</a>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl md:text-3xl font-serif font-bold text-[#5C4033] tracking-tighter cursor-pointer">
              LOOM<span className="font-light italic">&</span>CRAFT
            </span>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-3 md:space-x-6">
            <button className="hidden sm:block text-stone-700 hover:text-amber-800">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="hidden sm:block text-stone-700 hover:text-amber-800">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button className="text-stone-700 hover:text-amber-800 relative">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button className="text-stone-700 hover:text-amber-800 relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-2 bg-amber-700 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-4 text-center">
            <a href="#" className="block text-lg font-medium text-stone-800 py-2 border-b border-stone-50">Shop All</a>
            <a href="#" className="block text-lg font-medium text-stone-800 py-2 border-b border-stone-50">Sarees</a>
            <a href="#" className="block text-lg font-medium text-stone-800 py-2 border-b border-stone-50">Home Decor</a>
            <a href="#" className="block text-lg font-medium text-stone-800 py-2 border-b border-stone-50">Our Story</a>
            <div className="flex justify-center space-x-8 pt-4">
               <Search size={20} />
               <User size={20} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;