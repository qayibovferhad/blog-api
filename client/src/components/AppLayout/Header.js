import { Avatar, Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
const { Header } = Layout;
const menuItems = [
  {
    key: 1,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    key: 2,
    label: "Blogs",
    href: "/blogs",
  },
  {
    key: 3,
    label: "Chat",
    href: "/chat",
  },
];
function AppHeader() {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        {menuItems.map((menuItem) => (
          <NavLink key={menuItem.key} to={menuItem.href}>
            <Menu.Item>{menuItem.label}</Menu.Item>
          </NavLink>
        ))}
        <div className="user-info">
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        </div>
      </Menu>
    </Header>
  );
}
export default AppHeader;
