import { Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import "./index.css";

const UserView = () => {
  const location = useLocation();
  const token = Cookies.get("jwtToken");
  const details = jwtDecode(token);

  return (
    <div>
      {location.pathname === "/" ? (
        <div className="home-container-view">
          <div className="home-heading-container">
            <h1 className="home-heading">Welcome To TicketWise!</h1>
            <p className="home-para">The bridge to seamless issue handling</p>
          </div>
          <div className="main-detail-container" >
            <h1 className="welcome-heading">Welcome, {details.name}</h1>
            <div className="details-card">
              <h1>Your Account Details</h1>
              <p className="detail-label">Designation</p>
              <p> {details.role} </p>
              <p className="detail-label">Organisation </p>
              <p>{details.org_name}</p>
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default UserView;
