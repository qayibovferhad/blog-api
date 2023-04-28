import { Breadcrumb, Layout } from "antd";
import "./styles.css";
import AppHeader from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import breadcrumb from "../../utils/breadcrumb";
const { Content, Footer } = Layout;

function AppLayout() {
  const location = useLocation();
  const breadCrumb = breadcrumb[location.pathname];

  return (
    <Layout className="app-layout">
      <AppHeader />
      <Content className="app-content">
        <Breadcrumb className="app-breadcrumb">
          {breadCrumb.map((item, index) => (
            <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
          ))}
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
