import { useState } from "react";
import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const { Header, Content } = Layout;

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} />
      <Layout>
        

        {/* Content - This will render child routes */}
        <Content className="m-6 p-6 bg-white rounded-lg shadow">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}