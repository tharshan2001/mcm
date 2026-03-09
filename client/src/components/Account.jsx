import React, { useState, useEffect } from "react";
import {
  Package,
  Heart,
  Settings,
  MapPin,
  LogOut,
  ChevronRight,
  Clock,
  Award,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import OrdersList from "../components/order/OrdersList"; 

// --- Reusable UI Pieces ---
const NavItem = ({ item, active, onClick }) => (
  <button
    onClick={() => onClick(item.id)}
    className={`w-full flex items-center justify-between p-4 text-sm transition-all border ${
      active === item.id
        ? "bg-[#5C4033] text-white"
        : "bg-white text-stone-600 hover:bg-stone-50 border-stone-100"
    }`}
  >
    <div className="flex items-center gap-3">
      {item.icon} {item.label}
    </div>
    <ChevronRight
      size={14}
      className={active === item.id ? "opacity-100" : "opacity-0"}
    />
  </button>
);

const Account = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const { user, fetchUser, logout } = useAuthStore();
  const navigate = useNavigate();

  // Fetch user on mount
  useEffect(() => {
    const init = async () => {
      const u = await fetchUser();
      if (!u) navigate("/"); // redirect if not logged in
    };
    init();
  }, [fetchUser, navigate]);

  // Logout handler
  const handleLogout = async () => {
    await logout();
    navigate("/"); // redirect to homepage after logout
  };

  if (!user)
    return (
      <div className="py-20 text-center font-serif italic text-stone-500">
        Entering the atelier...
      </div>
    );

  const tabs = [
    { id: "orders", label: "Orders", icon: <Package size={18} /> },
    { id: "addresses", label: "Addresses", icon: <MapPin size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="bg-[#FCF9F6] h-[700px]">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-stone-100 flex items-center justify-center text-xl font-serif text-[#5C4033] border border-stone-200">
              {user.fullName?.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-serif text-[#5C4033]">
                {user.fullName}
              </h1>
              <p className="text-stone-400 text-xs uppercase tracking-widest">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] text-amber-800 font-bold uppercase tracking-tighter">
                Artisan Credits
              </p>
              <p className="flex items-center justify-end gap-1 text-lg font-serif text-amber-900">
                <Award size={16} /> {user.credits || 0}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-stone-400 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10 ">
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <NavItem
              key={tab.id}
              item={tab}
              active={activeTab}
              onClick={setActiveTab}
            />
          ))}
        </nav>

        <main className="lg:col-span-3 ">
          {activeTab === "orders" ? (
            <OrdersList />
          ) : (
            <div className="bg-white border border-stone-200 p-20 text-center">
              <p className="text-stone-400 italic font-serif capitalize">
                {activeTab}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Account;
