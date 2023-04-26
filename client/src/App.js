import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import { Suspense } from "react";
import AppLayout from "./components/AppLayout";
function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading Component..</h1>}>
        <Routes>
          <Route path="/" element={<h1>Hello nese</h1>} />
          <Route path="/auth/registration" element={<Registration />} />
          <Route path="/auth/login" element={<Login />} />

          <Route path="/" element={<AppLayout />}>
            <Route path="chat" element={<Chat />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
