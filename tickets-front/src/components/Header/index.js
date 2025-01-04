import "./index.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import makeToast from "../Toast/toast";

const Header = () => {
  const token = Cookies.get("jwtToken");
  const details = jwtDecode(token);
  const role = details.role;
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("jwtToken")
    
    makeToast("success", "Successfully logged Out");
    return navigate("/login")
  };

  if (role === "User") {
    role = "";
  }

  return (
    <div className="main-header-container">
      <div className="header-container-lg">
        <img src="/ticketwise.png" alt="Logo" className="ticketwise-logo" />
        <div className="detail-container">
          <div className="detail-items">
            <p>Welcome, {details.name}</p>
            {role !== "" ? <p>Designation : {role}</p> : ""}
          </div>
          <button type="button" className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
