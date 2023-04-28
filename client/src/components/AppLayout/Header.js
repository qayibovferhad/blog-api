import { Avatar, Dropdown, Layout, Menu, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../lib/axios";
const { Header } = Layout;

const menuItems = [
  {
    key: 1,
    label: <NavLink to="/dashboard">Dashboard</NavLink>,
  },
  {
    key: 2,
    label: <NavLink to="/blogs">Blogs</NavLink>,
  },
  {
    key: 3,
    label: <NavLink to="/chat">Chat</NavLink>,
  },
];
const dropDownItems = [
  {
    key: "profile",
    label: "Profile",
  },
  {
    key: "settings",
    label: "Settings",
  },
  {
    key: "logout",
    label: "Logout",
  },
];

function AppHeader() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser || {});
  async function handleDropdownClick(e) {
    if (e.key === "logout") {
      await axios.post("logout");
      navigate("/auth/login");
    }
  }

  return (
    <Header className="app-header">
      <div className="logo" />
      <Menu
        className="app-navigation"
        theme="dark"
        mode="horizontal"
        items={menuItems}
      />
      <div className="user-info">
        {user && (
          <Dropdown
            trigger="click"
            overlay={
              <Menu onClick={handleDropdownClick} items={dropDownItems} />
            }
          >
            <Typography.Text>
              <Space>
                <Avatar src={"http://localhost:1905/" + user.image} />
                {user.firstname + " " + user.lastname}
                <DownOutlined />
              </Space>
            </Typography.Text>
          </Dropdown>
        )}
      </div>
    </Header>
  );
}
export default AppHeader;
