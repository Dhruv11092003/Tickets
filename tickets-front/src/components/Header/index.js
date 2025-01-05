import "./index.css";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import makeToast from "../Toast/toast";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("jwtToken")
    makeToast("success", "Successfully logged Out");
    return navigate("/login")
  };



  return (
    <div className="main-header-container">
      <div className="header-container-lg">
        <Link to="/"><img src="/ticketwise.png" alt="Logo" className="ticketwise-logo" /></Link>
        <div className="detail-container">
          <button type="button" className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
