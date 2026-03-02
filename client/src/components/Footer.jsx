import React from 'react';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-stone-200 pt-16 pb-8 mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-12 border-b border-stone-200 mb-12">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-serif text-[#5C4033] mb-2">Join the Loom & Craft Community</h3>
            <p className="text-stone-600 font-light">Receive stories of artisans and early access to new collections.</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent border-b border-stone-400 py-2 px-1 focus:outline-none focus:border-amber-800 transition-colors w-full md:w-64 text-sm"
            />
            <button className="ml-4 flex items-center text-xs font-bold uppercase tracking-widest text-amber-900 hover:text-amber-700 transition-colors">
              Subscribe <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>

        {/* Middle Section: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Story */}
          <div>
            <span className="text-xl font-serif font-bold text-[#5C4033] tracking-tighter mb-6 block">
              LOOM<span className="font-light italic">&</span>CRAFT
            </span>
            <p className="text-stone-600 text-sm leading-relaxed mb-6 font-light">
              Dedicated to preserving the timeless art of hand-weaving. Every piece tells a story of heritage, patience, and the skilled hands of our master artisans.
            </p>
            <div className="flex space-x-5 text-stone-500">
              <Instagram size={20} className="cursor-pointer hover:text-amber-800 transition-colors" />
              <Facebook size={20} className="cursor-pointer hover:text-amber-800 transition-colors" />
              <Twitter size={20} className="cursor-pointer hover:text-amber-800 transition-colors" />
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-medium text-stone-900 uppercase text-xs tracking-widest mb-6">Collections</h4>
            <ul className="space-y-4 text-sm text-stone-600 font-light">
              <li><a href="#" className="hover:text-amber-800 transition-colors">Silk Sarees</a></li>
              <li><a href="#" className="hover:text-amber-800 transition-colors">Cotton Handlooms</a></li>
              <li><a href="#" className="hover:text-amber-800 transition-colors">Home Linens</a></li>
              <li><a href="#" className="hover:text-amber-800 transition-colors">Seasonal Edit</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-medium text-stone-900 uppercase text-xs tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-stone-600 font-light">
              <li><a href="#" className="hover:text-amber-800 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-amber-800 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-amber-800 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-amber-800 transition-colors">Wholesale Inquiry</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium text-stone-900 uppercase text-xs tracking-widest mb-6">Visit Our Studio</h4>
            <ul className="space-y-4 text-sm text-stone-600 font-light">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-stone-400 shrink-0" />
                <span>122 Artisan Lane, Weaving District<br />Varanasi, UP 221001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-stone-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-stone-400 shrink-0" />
                <span>hello@loomandcraft.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Payments */}
        <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center text-[11px] text-stone-500 uppercase tracking-widest">
          <p>© 2026 LOOM & CRAFT. HANDCRAFTED IN INDIA WITH LOVE.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>UPI</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;