import { Avatar, Breadcrumb, Layout, Menu } from "antd";
import "./styles.css";
import AppHeader from "./Header";
import { NavLink, Outlet } from "react-router-dom";
const { Header, Content, Footer } = Layout;

function AppLayout() {
  return (
    <Layout className="app-layout">
      <AppHeader />
      <Content className="app-content">
        <Breadcrumb className="app-breadcrumb">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <main className="site-layout-content">
          <Outlet />
        </main>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Farhad Gayibov
      </Footer>
    </Layout>
  );
}
export default AppLayout;
