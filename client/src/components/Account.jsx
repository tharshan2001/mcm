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
  Menu,
  X,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import OrdersList from "../components/order/OrdersList";
import AddressSettings from "../components/address/AddressSettings";

const NavItem = ({ item, active, onClick, mobile }) => (
  <button
    onClick={() => onClick(item.id)}
    className={`w-full flex items-center justify-between p-3 md:p-4 text-sm transition-all border ${
      active === item.id
        ? "bg-[#5C4033] text-white"
        : "bg-white text-stone-600 hover:bg-stone-50 border-stone-100"
    }`}
  >
    <div className="flex items-center gap-3">
      {item.icon} <span className="hidden md:inline">{item.label}</span>
      <span className="md:hidden text-xs">{item.label}</span>
    </div>
    <ChevronRight
      size={14}
      className={active === item.id ? "opacity-100" : "opacity-0"}
    />
  </button>
);

const Account = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, fetchUser, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const u = await fetchUser();
      if (!u) {
        navigate("/");
        return;
      }
      // Redirect admin to dashboard
      if (u.roles?.includes("ADMIN")) {
        window.open("/admin", "_blank");
        navigate("/");
      }
    };
    init();
  }, [fetchUser, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
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
      <div className="bg-white border-b border-stone-200 py-6 md:py-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center gap-4 md:gap-5 w-full md:w-auto">
            <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-stone-100 flex items-center justify-center text-lg md:text-xl font-serif text-[#5C4033] border border-stone-200 shrink-0">
              {user.fullName?.charAt(0)}
            </div>
            <div className="min-w-0">
              <h1 className="text-lg md:text-2xl font-serif text-[#5C4033] truncate">
                {user.fullName}
              </h1>
              <p className="text-stone-400 text-xs uppercase tracking-widest truncate max-w-[200px] md:max-w-none">
                {user.email}
              </p>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden absolute right-4 top-6 p-2 text-stone-600"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            <div className="text-right">
              <p className="text-[10px] text-amber-800 font-bold uppercase tracking-tighter">
                Credits
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

      {/* Mobile Tab Navigation */}
      <div className="md:hidden bg-white border-b border-stone-200 overflow-x-auto no-scrollbar-mobile">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileMenuOpen(false);
              }}
              className={`flex-1 min-w-0 py-3 px-4 text-xs font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? "text-[#5C4033] border-[#5C4033]"
                  : "text-stone-400 border-transparent"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-12 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
        {/* Desktop Sidebar */}
        <nav className="hidden md:block space-y-1">
          {tabs.map((tab) => (
            <NavItem
              key={tab.id}
              item={tab}
              active={activeTab}
              onClick={setActiveTab}
              mobile
            />
          ))}
        </nav>

        <main className="md:col-span-3">
          {activeTab === "orders" ? (
            <OrdersList />
          ) : activeTab === "addresses" ? (
            <AddressSettings />
          ) : (
            <div className="bg-white border border-stone-200 p-8 md:p-20 text-center">
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