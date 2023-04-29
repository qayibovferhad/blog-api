import { Avatar, List, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import axios from "../../lib/axios";
function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(undefined);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`blogs/${blogId}`);
      setBlog(data);
    }
    fetchData();
  }, [blogId]);
  console.log(blog);
  return <ProtectedRoute></ProtectedRoute>;
}

export default BlogDetail;
