import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import { message, Button, Form, Typography, Input } from "antd";
import { useState } from "react";
import axios from "../../lib/axios";
function ResetPassword() {
  const [submitting, setSubmitting] = useState(false);
  const { resetToken } = useParams();
  const navigate = useNavigate();
  async function onFinish(values) {
    try {
      setSubmitting(true);
      const data = await axios.patch("password", {
        newPassword: values.password,
        resetToken,
      });
      message.success(data.data.message);
      navigate("/auth/login");
    } catch (error) {
      const errorMessage = error.response.data.message;
      message.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="password-container">
      <div className="password-form-container">
        <Typography.Title>Reset Password</Typography.Title>
        <Typography.Paragraph>
          Please confirm your new password!
        </Typography.Paragraph>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button loading={submitting} block type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
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

export default ResetPassword;
