import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/login";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Home/Views/AdminView/dashboard";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
