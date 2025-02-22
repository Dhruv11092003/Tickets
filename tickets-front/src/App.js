import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/login";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import SuperAdminDashboard from "./components/Home/Views/Super-Admin/SuperADashboard";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import ManageUser from "./components/Home/Views/Super-Admin/ManageUser";
import AssignTickets from "./components/Home/Views/Super-Admin/AssignTickets";
import AdminDashboard from "./components/Home/Views/AdminView/AdminDashboard";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}>
          <Route path="/unauthorized" element={<Unauthorized/>}/>
          <Route path="/s-admin" element={<PrivateRoute allowedRoles={["Super-Admin"]}/>}>
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="manageUser" element={<ManageUser/>}/>
            <Route path="assignTickets" element={<AssignTickets/>}/>
          </Route>
          
          <Route path="/admin" element={<PrivateRoute allowedRoles={["Admin"]}/>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* <Route path="manageUser" element={<ManageUser/>}/>
            <Route path="assignTickets" element={<AssignTickets/>}/> */}
          </Route>

          <Route path="/user" element={<PrivateRoute allowedRoles={["User"]}/>}>
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            {/* <Route path="manageUser" element={<ManageUser/>}/>
            <Route path="assignTickets" element={<AssignTickets/>}/> */}
          </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
