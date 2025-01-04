import { Outlet, useLocation } from "react-router-dom";

const AdminView = () => {
  const location = useLocation();
  return <div>{location.pathname === "/" ? <h1>Admin</h1> : <Outlet />}</div>;
};

export default AdminView;
