import { Button, Form, Input, message, Radio, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ProtectedRoute from "../../components/ProtectedRoute";
import axios from "../../lib/axios";
function BlogCreate() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  async function onFinishValue(values) {
    setSubmitting(true);
    axios.post("blogs", values);
    message.success("Blog created successfully!");
    navigate("/blogs");

    try {
    } catch (err) {
      const errorMessage = err.response.data.message;
      message.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <ProtectedRoute>
      <Form
        layout="vertical"
        onFinish={onFinishValue}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter blog title!" }]}
        >
          <Input placeholder="Enter blog title.." />
        </Form.Item>
        <Form.Item
          label="Content"
          name="body"
          rules={[{ required: true, message: "Please enter blog content!" }]}
        >
          <Input.TextArea rows={5} placeholder="Enter blog content.." />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="Add Tags.."
          />
        </Form.Item>
        <Form.Item>
          <Button loading={submitting} htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ProtectedRoute>
  );
}
export default BlogCreate;
