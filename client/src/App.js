import { Route, Routes } from "react-router-dom";
import { Button } from "antd";
import Login from "./pages/Login/";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<Button type="primary">Button</Button>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/registration" element={<Registration />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
