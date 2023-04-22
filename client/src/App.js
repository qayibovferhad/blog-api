import { Route, Routes } from "react-router-dom";
import { Button } from "antd";
import Login from "./pages/Login/";
import Registration from "./pages/Registration";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<Button type="primary">Button</Button>} />
        <Route path="/auth/registration" element={<Registration />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
