import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { message, Button, Form, Typography } from "antd";
import Input from "antd/es/input/Input";
import { useState } from "react";
import axios from "../../lib/axios";
function ForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  async function onFinish(values) {
    try {
      setSubmitting(true);
      const data = await axios.post("password/reset-request", values);
      message.success(data.data.message);
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
          Please enter your email address for reset password
        </Typography.Paragraph>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input type="email" />
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

export default ForgotPassword;
