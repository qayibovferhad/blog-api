import AppLayout from "../../components/AppLayout";
import ProtectedRoute from "../../components/ProtectedRoute";

function Dashboard() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <h1>Hello</h1>
      </AppLayout>
    </ProtectedRoute>
  );
}
export default Dashboard;
