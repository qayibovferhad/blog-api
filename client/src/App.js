import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import ResetPassword from "./pages/ResetPassword";
import AppLayout from "./components/AppLayout";
import Blogs from "./pages/Blogs";
import ForgotPassword from "./pages/ForgotPassword";
import BlogCreate from "./pages/BlogCreate";
import BlogDetails from "./pages/BlogDetails";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="/auth/registration" element={<Registration />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/auth/reset-password/:resetToken"
          element={<ResetPassword />}
        />

        <Route path="/" element={<AppLayout />}>
          <Route path="chat" element={<Chat />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/create" element={<BlogCreate />} />
          <Route path="blogs/:blogId" element={<BlogDetails />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
