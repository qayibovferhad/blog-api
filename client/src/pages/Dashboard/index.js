import ProtectedRoute from "../../components/ProtectedRoute";

function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>Hello</h1>
    </ProtectedRoute>
  );
}
export default Dashboard;
