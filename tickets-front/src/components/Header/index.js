import "./index.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { SiGooglemessages } from "react-icons/si";
import makeToast from "../Toast/toast";
import Messages from "../Home/Views/MessagesComponents/Messages";
import PopupComponent from "../PopupComponent/PopupComponent";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("jwtToken");
    makeToast("success", "Successfully logged Out");
    return navigate("/login");
  };

  return (
    <div className="main-header-container">
      <div className="header-container-lg">
        <Link to="/">
          <img src="/ticketwise.png" alt="Logo" className="ticketwise-logo" />
        </Link>
        <div className="detail-container">
          <PopupComponent
            trigger={
              <button type="button" className="messages-btn">
                <SiGooglemessages />
              </button>
            }
            content={<Messages />}
          />
          <button type="button" className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
