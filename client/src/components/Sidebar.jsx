import React, { useState } from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import { 
  LayoutDashboard, 
  PackageSearch, 
  Scissors, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

const { Sider } = Layout;

// Helper for Ant Design v5 Menu items
const getItem = (label, key, icon, children) => {
  return { key, icon, children, label };
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Sidebar Menu Structure
  const items = [
    getItem('Atelier Overview', 'dashboard', <LayoutDashboard size={18} />),
    getItem('Products', 'products', <PackageSearch size={18} />, [
      getItem('Active Looms', 'prod-active'),
      getItem('Drafts', 'prod-drafts'),
      getItem('Materials', 'prod-materials'),
    ]),
    getItem('Master Weavers', 'artisans', <Scissors size={18} />),
    getItem('Customers', 'customers', <Users size={18} />),
    getItem('Settings', 'settings', <Settings size={18} />),
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5C4033', // Deep Brown for active states
          colorBgContainer: '#FCF9F6', // Parchment background
          colorText: '#57534e', // Tailwind stone-600
          fontFamily: 'inherit', // Use Tailwind font
        },
        components: {
          Menu: {
            itemBg: 'transparent',
            itemSelectedBg: '#f3e8ff',
            itemSelectedColor: '#5C4033',
            itemHoverBg: '#f5f5f4',
            itemActiveBg: '#f5f5f4',
          },
          Layout: {
            siderBg: '#FCF9F6',
          }
        },
      }}
    >
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        width={260}
        className="min-h-screen border-r border-stone-200 relative"
        theme="light"
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-center border-b border-stone-200 mb-4">
          <span className={`font-serif text-[#5C4033] font-bold tracking-tighter transition-all ${collapsed ? 'text-xl' : 'text-2xl'}`}>
            {collapsed ? 'L&C' : 'LOOM & CRAFT'}
          </span>
        </div>

        {/* Sidebar Menu */}
        <Menu 
          defaultSelectedKeys={['dashboard']} 
          mode="inline" 
          items={items} 
          className="border-none px-2 font-medium"
        />

        {/* Bottom Logout */}
        <div className="absolute bottom-16 w-full px-4">
          <button className={`flex items-center gap-3 text-stone-500 hover:text-red-700 transition-colors w-full p-2 ${collapsed ? 'justify-center' : 'justify-start'}`}>
            <LogOut size={18} />
            {!collapsed && <span className="text-sm font-medium">Exit Portal</span>}
          </button>
        </div>
      </Sider>
    </ConfigProvider>
  );
};

export default Sidebar;