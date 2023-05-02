import { Button, List, message } from "antd";
import React, { useEffect, useState } from "react";
import BlogItem from "../../components/BlogItem/BlogItem";
import ProtectedRoute from "../../components/ProtectedRoute";
import "./styles.css";
import axios from "../../lib/axios";
import debounce from "lodash.debounce";
import Input from "antd/es/input/Input";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";

const LIMIT = 6;
function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState("");

  useEffect(() => {
    const pageFromURL = searchParams.has("pages")
      ? Number(searchParams.get("pages"))
      : 1;
    setCurrentPage(pageFromURL);
    async function fetchBlogs() {
      setLoading(true);
      try {
        const params = { limit: LIMIT, page: pageFromURL, q };
        const { list, total } = await axios
          .get("blogs", { params })
          .then((r) => r.data);
        setBlogs(list);
        setTotal(total);
      } catch (err) {
        message.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [currentPage, q]);
  function handlePageChange(pages) {
    setSearchParams({ pages });
    setCurrentPage(pages);
  }

  const handleSearch = debounce((e) => {
    setQ(e.target.value);
  }, 500);
  return (
    <ProtectedRoute>
      <div className="dashboard-container">
        <div className="dashboard-actions">
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
          dataSource={blogs}
          renderItem={(item) => <BlogItem item={item} />}
        />
      </div>
    </ProtectedRoute>
  );
}
export default Dashboard;
