import { Avatar, Button, List, Space } from "antd";
import React, { useEffect } from "react";
import BlogItem from "./BlogItem";
import ProtectedRoute from "../../components/ProtectedRoute";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/features/blogSlice";
import Input from "antd/es/input/Input";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Blogs() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.blogs);
  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);
  console.log(list, loading);
  return (
    <ProtectedRoute>
      <div className="blogs-container">
        <div className="blog-actions">
          <Input
            style={{ width: "200px" }}
            placeholder="Search Blogs.."
            prefix={<SearchOutlined />}
          />
          <Link to="/blogs/create">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Blog
            </Button>
          </Link>
        </div>
        <List
          itemLayout="vertical"
          size="large"
          loading={loading}
          dataSource={list}
          renderItem={(item) => <BlogItem item={item} />}
        />
      </div>
    </ProtectedRoute>
  );
}
export default Blogs;
