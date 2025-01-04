import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminView from "../Home/Views/AdminView/AdminView";
import SuperAdminView from "../Home/Views/Super-Admin/SuperAdminView";
import UserView from "../Home/Views/UserView/UserView";
import Header from "../Header";
import Sidebar from "../Sidebar/Sidebar";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");
  if (token === undefined) {
    return navigate("/login");
    return null;
  }

  const details = jwtDecode(token);

  const renderViews = () => {
    if (details.role === "Admin") {
      return <AdminView />;
    }
    if (details.role === "Super-Admin") {
      return <SuperAdminView />;
    }
    if (details.role === "User") {
      return <UserView />;
    }
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-view">
        <Sidebar/>
        <div className="view-container">
        {renderViews(details)}
        </div>
        </div>
    </div>
  );
};
export default Home;
