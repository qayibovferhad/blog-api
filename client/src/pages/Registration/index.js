import React, { useEffect } from "react";
import RegistrationForm from "./RegistrationForm";
import { Link } from "react-router-dom";
import "./styles.css";
import { Typography } from "antd";
function Registartion() {
  useEffect(() => {
    window.onbeforeunload = function () {
      return "Are you sure?";
    };
  });
  return (
    <div className="login-container">
      <div className="login-form-container">
        <Typography.Title>Register</Typography.Title>
        <RegistrationForm />
        <p>
          <span style={{ marginRight: "5px" }}>Already have an account?</span>
          <Link style={{ textDecoration: "none" }} to="/auth/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registartion;
