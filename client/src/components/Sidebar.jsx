import React, { useState } from "react";
import { Layout, Menu, ConfigProvider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PackageSearch,
  Store,
  Users,
  Settings,
  Package,
  LogOut,
  Tag,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";

const { Sider } = Layout;

// Helper for Ant Design v5 Menu items
const getItem = (label, key, icon, children) => {
  return { key, icon, children, label };
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Sidebar Menu Structure with /admin/ prefix
  const items = [
    getItem(
      <Link to="/admin">Atelier Overview</Link>,
      "dashboard",
      <LayoutDashboard size={18} />,
    ),
    getItem(
      <span>Store</span>, // parent menu without a link
      "products",
      <Store size={18} />,
      [
        getItem(
          <Link to="/admin/product-list">Porducts</Link>,
          "prod-active",
        ),
        getItem(<Link to="/admin/category">Category</Link>, "prod-category"),
      ],
    ),
    getItem(
      <Link to="/admin/order-list">Orders</Link>,
      "artisans",
      <Package size={18} />,
    ),
    getItem(
      <Link to="/admin/customers">Customers</Link>,
      "customers",
      <Users size={18} />,
    ),
    getItem(
      <Link to="/admin/coupons">Coupons</Link>,
      "coupons",
      <Tag size={18} />,
    )
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#5C4033",
          colorBgContainer: "#fafaf9",
          colorText: "#57534e",
          fontFamily: "inherit",
        },
        components: {
          Menu: {
            itemBg: "transparent",
            itemSelectedBg: "#e7e5e4",
            itemSelectedColor: "#5C4033",
            itemHoverBg: "#f5f5f4",
            itemActiveBg: "#f5f5f4",
          },
          Layout: {
            siderBg: "#fafaf9",
          },
        },
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={260}
        className="min-h-screen border-r border-stone-200 relative z-20" // added z-index
        theme="light"
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-center border-b border-stone-200 mb-4">
          <span
            className={`font-serif text-[#5C4033] font-bold tracking-tighter transition-all ${collapsed ? "text-xl" : "text-2xl"}`}
          >
            {collapsed ? "MCM" : "MCM Handlooms"}
          </span>
        </div>

        {/* Sidebar Menu */}
        <Menu
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={items}
          className="border-none px-2 font-medium"
        />

        {/* Bottom Logout */}
        <div className="absolute bottom-16 w-full px-4">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 text-stone-500 hover:text-red-700 transition-colors w-full p-2 ${collapsed ? "justify-center" : "justify-start"}`}
          >
            <LogOut size={18} />
            {!collapsed && (
              <span className="text-sm font-medium">Exit Portal</span>
            )}
          </button>
        </div>
      </Sider>
    </ConfigProvider>
  );
};

export default Sidebar;
