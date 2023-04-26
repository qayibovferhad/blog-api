import React from "react";
import AppLayout from "../../components/AppLayout";
import ProtectedRoute from "../../components/ProtectedRoute";

function Chat() {
  return (
    <ProtectedRoute>
      <h1>Hello to Chat</h1>
    </ProtectedRoute>
  );
}
export default Chat;
