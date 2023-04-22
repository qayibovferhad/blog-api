import React from "react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import "./styles.css";
import { Typography } from "antd";
function Login() {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <Typography.Title>Sign In</Typography.Title>
        <LoginForm />
        <p>
          <span style={{ marginRight: "5px" }}>Don't have an account?</span>
          <Link style={{ textDecoration: "none" }} to="/auth/registration">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
