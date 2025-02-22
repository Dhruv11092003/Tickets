import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminView from "../Home/Views/AdminView/AdminView";
import SuperAdminView from "../Home/Views/Super-Admin/SuperAdminView";
import UserView from "../Home/Views/UserView/UserView";
import Header from "../Header";
import Sidebar from "../Sidebar/Sidebar";
import "./index.css";
import { FaHome, FaTicketAlt ,FaUserAlt} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

const Home = () => {
  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");
  if (token === undefined) {
    return navigate("/login");
  }

  const SidebarItems = [
    {
      user: {},
      admin: [{name:"Dashboard",route:"/admin/dashboard",icon:<FaHome className="icon"/> }],
      superAdmin: [
        { name: "Dashboard", route: "/s-admin/dashboard", icon:<FaHome className="icon"/> },
        { name: "User Management", route: "/s-admin/manageUser",  icon:<FaUserAlt className="icon"/> },
        { name: "Assign Tickets", route: "/s-admin/assignTickets",icon:<FaTicketAlt className="icon"/> },
      ],
    },
  ];

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

  const renderSidebar = () => {
    if (details.role === "Admin") {
      return <Sidebar items={SidebarItems[0].admin} />;
    }
    if (details.role === "Super-Admin") {
      return <Sidebar items={SidebarItems[0].superAdmin} />;
    }
    if (details.role === "User") {
      return <Sidebar items={SidebarItems[0].user} />;
    }
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-view">
        {renderSidebar()}
        <div className="view-container">{renderViews(details)}</div>
      </div>
    </div>
  );
};
export default Home;
