import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const PrivateRoute = (props) => {
  const { allowedRoles } = props;
  const token = Cookies.get("jwtToken");
  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;
  console.log(role)
  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/Unauthorized" />
  );
};

export default PrivateRoute