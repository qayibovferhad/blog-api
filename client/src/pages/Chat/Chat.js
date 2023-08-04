import { Avatar, List, Skeleton } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import { fetchUsers } from "../../redux/features/chatSlice";
import "./styles.css";

function Chat() {
  const dispatch = useDispatch();
  const { list, total, error, loading } = useSelector(
    (state) => state.chat.users
  );
  console.log("list", list);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <ProtectedRoute>
      <div className="chat-container">
        <div className="users">
          <h1>List of Users</h1>
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item, index) => (
              <Skeleton loading={loading} active avatar>
                <NavLink to={`/chat/${item._id}`}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={"http://localhost:1905/" + item.image} />
                      }
                      title={<a>{item.email}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                </NavLink>
              </Skeleton>
            )}
          />
        </div>

        <div className="inbox">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
}
export default Chat;
