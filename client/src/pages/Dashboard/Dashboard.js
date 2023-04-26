import AppLayout from "../../components/AppLayout";
import ProtectedRoute from "../../components/ProtectedRoute";
import React from "react";

function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>Hello to dashboard</h1>
    </ProtectedRoute>
  );
}
export default Dashboard;
