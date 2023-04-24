import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../lib/axios";
import { setCurrentUser, setLoading } from "../redux/features/userSlice";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data } = await axios.get("me");
        if (!data) {
          navigate("/auth/login");
        } else {
          dispatch(setCurrentUser(data));
        }
      } catch (error) {
        navigate("/auth/login");
      } finally {
        dispatch(setLoading(false));
      }
    }
    if (!currentUser) {
      getUserInfo();
    }
  });
  if (loading) {
    <h1>Authorizing..</h1>;
  }
  return children;
}
export default ProtectedRoute;
