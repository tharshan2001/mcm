import React, { useState, useEffect } from 'react';
import { Package, Heart, Settings, MapPin, LogOut, ChevronRight, Clock, Award } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

// --- Reusable UI Pieces ---
const NavItem = ({ item, active, onClick }) => (
  <button
    onClick={() => onClick(item.id)}
    className={`w-full flex items-center justify-between p-4 text-sm transition-all border ${
      active === item.id ? "bg-[#5C4033] text-white" : "bg-white text-stone-600 hover:bg-stone-50 border-stone-100"
    }`}
  >
    <div className="flex items-center gap-3">{item.icon} {item.label}</div>
    <ChevronRight size={14} className={active === item.id ? "opacity-100" : "opacity-0"} />
  </button>
);

const OrderRow = ({ order }) => (
  <div className="bg-white p-5 border border-stone-200 flex justify-between items-center group hover:border-amber-200 transition-colors">
    <div className="flex gap-4 items-center">
      <div className="p-2 bg-stone-50 text-stone-400"><Package size={20} /></div>
      <div>
        <p className="font-medium text-stone-900 text-sm">{order.id}</p>
        <p className="text-[10px] text-stone-500 uppercase">{order.date}</p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
        order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
      }`}>
        {order.status}
      </span>
      <p className="font-serif font-bold text-stone-900">{order.total}</p>
    </div>
  </div>
);

// --- Main Component ---
const Account = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const { user, fetchUser, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser().then((u) => !u && navigate('/'));
  }, [fetchUser, navigate]);

  if (!user) return <div className="py-20 text-center font-serif italic text-stone-500">Entering the atelier...</div>;

  const tabs = [
    { id: 'orders', label: 'Orders', icon: <Package size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="bg-[#FCF9F6] h-[740px]">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-stone-100 flex items-center justify-center text-xl font-serif text-[#5C4033] border border-stone-200">
              {user.full_name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-serif text-[#5C4033]">{user.full_name}</h1>
              <p className="text-stone-400 text-xs uppercase tracking-widest">
                Member Since {new Date(user.createdAt).getFullYear()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] text-amber-800 font-bold uppercase tracking-tighter">Artisan Credits</p>
              <p className="flex items-center justify-end gap-1 text-lg font-serif text-amber-900"><Award size={16}/> {user.credits || 0}</p>
            </div>
            <button onClick={logout} className="p-2 text-stone-400 hover:text-red-600 transition-colors"><LogOut size={20}/></button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <nav className="space-y-1">
          {tabs.map(tab => <NavItem key={tab.id} item={tab} active={activeTab} onClick={setActiveTab} />)}
        </nav>

        <main className="lg:col-span-3">
          {activeTab === 'orders' ? (
            <div className="space-y-4">
              <h3 className="text-lg font-serif text-[#5C4033] mb-4">Past Purchases</h3>
              {/* Replace with real map of user orders */}
              <OrderRow order={{ id: "#LC-9902", date: "Feb 12, 2026", status: "Delivered", total: "$280.00" }} />
              <OrderRow order={{ id: "#LC-8841", date: "Jan 05, 2026", status: "In Transit", total: "$125.00" }} />
              
              <div className="mt-10 p-10 border border-dashed border-stone-200 text-center bg-white/50">
                <Clock size={24} className="mx-auto text-stone-300 mb-3" />
                <p className="text-sm text-stone-500 italic">Ready for your next find?</p>
                <button onClick={() => navigate('/shop')} className="mt-3 text-amber-800 text-xs font-bold uppercase tracking-widest border-b border-amber-800">Shop The Collection</button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-stone-200 p-20 text-center">
              <p className="text-stone-400 italic font-serif capitalize">{activeTab}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Account;