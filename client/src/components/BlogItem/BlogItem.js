import React from "react";
import { LikeOutlined, MessageOutlined, LikeTwoTone } from "@ant-design/icons";
import { Avatar, Button, List, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import { timeAgo } from "../../lib/timeAgo";
import { useBlogLike } from "../../hooks/useBlogLike";
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function BlogItem({ item }) {
  const [isBlogLiked, handleLikeClick] = useBlogLike(item);
  return (
    <List.Item
      extra={<small>{timeAgo.format(new Date(item.createdAt))}</small>}
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
          text={item.comments.length}
          key="list-vertical-message"
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={"http://localhost:1905/" + item.author.image} />}
        description={item.author.fullName}
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
