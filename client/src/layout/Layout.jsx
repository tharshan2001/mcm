import { useState } from "react";
import { Layout } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Sidebar from "../components/Sidebar";

const { Header, Content } = Layout;

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">

      <Sidebar collapsed={collapsed} />

      <Layout>

        {/* Header */}
        <Header className="bg-white flex items-center px-6 shadow">

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xl mr-4"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>

          <h1 className="text-lg font-semibold">
            Admin Dashboard
          </h1>

        </Header>

        {/* Content */}
        <Content className="m-6 p-6 bg-white rounded-lg shadow">

          <h2 className="text-2xl font-bold mb-4">
            Dashboard Content
          </h2>

          <p className="text-gray-600">
            Your content goes here.
          </p>

        </Content>

      </Layout>

    </Layout>
  );
}