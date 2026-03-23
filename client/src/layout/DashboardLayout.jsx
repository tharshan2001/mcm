import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const { Header, Content } = Layout;

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen bg-stone-100">
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Content className="m-6 p-6 bg-white rounded-lg shadow-sm border border-stone-200">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}