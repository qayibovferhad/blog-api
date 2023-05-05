import { Button, List } from "antd";
import React, { useEffect, useState } from "react";
import { fetchBlogs, setCurrentPage } from "../../redux/features/blogSlice";
import BlogItem from "../../components/BlogItem/BlogItem";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../../components/ProtectedRoute";
import "./styles.css";
import debounce from "lodash.debounce";
import Input from "antd/es/input/Input";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";

function Blogs() {
  const LIMIT = 4;
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState("");
  const { currentPage, total, list, loading, error } = useSelector(
    (state) => state.blogs
  );
  useEffect(() => {
    const pageFromURL = searchParams.has("pages")
      ? Number(searchParams.get("pages"))
      : 1;
    dispatch(setCurrentPage(pageFromURL));
    const params = { limit: LIMIT, page: pageFromURL, q };
    dispatch(fetchBlogs(params));
  }, [currentPage, q]);
  function handlePageChange(pages) {
    setSearchParams({ pages });
    dispatch(setCurrentPage(pages));
  }

  const handleSearch = debounce((e) => {
    setQ(e.target.value);
  }, 500);
  return (
    <ProtectedRoute>
      <div className="blogs-container">
        <div className="blog-actions">
          <Input
            style={{ width: "200px" }}
            placeholder="Search Blogs.."
            prefix={<SearchOutlined />}
            onChange={handleSearch}
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
          pagination={{
            onChange: handlePageChange,
            pageSize: LIMIT,
            total,
            current: currentPage,
          }}
          dataSource={list}
          renderItem={(item) => <BlogItem item={item} />}
        />
      </div>
    </ProtectedRoute>
  );
}
export default Blogs;
