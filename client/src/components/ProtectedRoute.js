import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const accesToken = localStorage.getItem("access_token");
  if (!accesToken) {
    return <Navigate to="/auth/login" />;
  }
  return children;
}
export default ProtectedRoute;
