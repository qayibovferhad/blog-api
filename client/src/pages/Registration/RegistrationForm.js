import { Button, Form, Input, message, Upload } from "antd";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

import { useState } from "react";
function RegistrationForm() {
  function normFile(e) {
    return e.fileList[0];
  }

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  async function onFinish(values) {
    try {
      const formData = new FormData();
      formData.append("firstname", values.firstname);
      formData.append("lastname", values.lastname);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("image", values.image.originFileObj);
      setSubmitting(true);
      await axios.post("register", formData);
      message.success("Registration is successfull");
      navigate("/auth/login");
    } catch (error) {
      const errorMessage = error.response.data.message;
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
        label="Firstname"
        name="firstname"
        rules={[{ required: true, message: "Please enter your firstname!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Lastname"
        name="lastname"
        rules={[{ required: true, message: "Please enter your lastname!" }]}
      >
        <Input />
      </Form.Item>

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
      <Form.Item
        label="Profile picture"
        getValueFromEvent={normFile}
        name="image"
      >
        <Upload block beforeUpload={() => false}>
          <Button block icon={<UploadOutlined />}>
            Add Image
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button loading={submitting} block type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}
export default RegistrationForm;
