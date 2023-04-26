import { Avatar, List, Space } from "antd";
import React, { useEffect } from "react";
import BlogItem from "./BlogItem";
import ProtectedRoute from "../../components/ProtectedRoute";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/features/blogSlice";

function Blogs() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.blogs);
  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);
  return (
    <ProtectedRoute>
      <div className="blogs-container">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          loading={loading}
          dataSource={list}
          footer={
            <div>
              <b>ant design</b> footer part
            </div>
          }
          renderItem={(item) => <BlogItem item={item} />}
        />
      </div>
    </ProtectedRoute>
  );
}
export default Blogs;