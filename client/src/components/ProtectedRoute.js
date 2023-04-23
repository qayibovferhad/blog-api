import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
function ProtectedRoute({ children }) {
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data } = await axios.get("me");
        console.log(data);
        if (!data) {
          navigate("/auth/login");
        } else {
        }
      } catch (error) {
        navigate("/auth/login");
      } finally {
        setFetching(true);
      }
    }

    getUserInfo();
  }, []);
  if (fetching) {
    <h1>Authorizing..</h1>;
  }
  return children;
}
export default ProtectedRoute;
