import React from "react";
import { LikeOutlined, MessageOutlined, LikeTwoTone } from "@ant-design/icons";
import { Avatar, Button, List, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";
import { useSelector } from "react-redux";
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function BlogItem({ item }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  async function handleLikeClick(blogId) {
    await axios.put(`/blogs/${blogId}/like`);
  }
  const isBlogLiked = item.likes.includes(currentUser._id);
  return (
    <List.Item
      key={item.title}
      actions={[
        <Button
          onClick={() => handleLikeClick(item._id)}
          key="like-icon"
          type="text"
          size="small"
          icon={isBlogLiked ? <LikeTwoTone /> : <LikeOutlined />}
        >
          <span style={{ marginLeft: "7px" }}>{item.likes.length}</span>
        </Button>,
        <IconText
          icon={MessageOutlined}
          text="2"
          key="list-vertical-message"
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={"http://localhost:1905/" + item.author.image} />}
        description={item.author.firstname + " " + item.author.lastname}
        title={<Link to={`/blogs/${item._id}`}>{item.title}</Link>}
      />
      {item.body.substring(0, 300)}..
      <div style={{ marginTop: "10px" }}>
        {item.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </List.Item>
  );
}
export default BlogItem;
