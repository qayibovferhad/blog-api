import { Button, Form, Input, message } from "antd";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function LoginForm() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  async function onFinish(values) {
    try {
      setSubmitting(true);
      await axios.post("login", values);
      navigate("/");
    } catch (err) {
      const errorMessage = "Username or Password is not correct!";
      message.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter your email!" }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button loading={submitting} block type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
}
export default LoginForm;
