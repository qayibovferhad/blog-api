import { Button, Descriptions, Tag } from "antd";
import { LikeOutlined, MessageOutlined, LikeTwoTone } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { timeAgo } from "../../lib/timeAgo";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import axios from "../../lib/axios";
import { useBlogLike } from "../../hooks/useBlogLike";
const defaultBlog = {
  _id: null,
  title: "Loading...",
  body: "Loading...",
  author: {},
  likes: [],
  tags: [],
  comments: [],
  createdAt: "01-01-1970",
};
function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(defaultBlog);
  const [isBlogLiked, handleLikeClick] = useBlogLike(blog);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`blogs/${blogId}`);
      setBlog(data);
    }
    fetchData();
  }, [blogId]);
  console.log(blog);
  return (
    <ProtectedRoute>
      {blog && (
        <Descriptions
          title={<h1>{blog.title}</h1>}
          extra={<small>{timeAgo.format(new Date(blog.createdAt))}</small>}
        >
          <Descriptions.Item>
            {blog.author.lastname + " " + blog.author.firstname}
          </Descriptions.Item>
          <Descriptions.Item>
            <Button
              onClick={() => handleLikeClick(blog._id)}
              key="like-icon"
              type="text"
              size="small"
              icon={isBlogLiked ? <LikeTwoTone /> : <LikeOutlined />}
            >
              <span style={{ marginLeft: "7px" }}>{blog.likes.length}</span>
            </Button>
            ,
          </Descriptions.Item>
          <p>{blog.body}</p>
          <div style={{ marginTop: "10px" }}>
            {blog.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </Descriptions>
      )}
    </ProtectedRoute>
  );
}

export default BlogDetail;
