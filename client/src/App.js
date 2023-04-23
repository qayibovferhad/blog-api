import { Route, Routes, Navigate } from "react-router-dom";
import { Button } from "antd";
import Login from "./pages/Login/";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Hello nese</h1>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/registration" element={<Registration />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
