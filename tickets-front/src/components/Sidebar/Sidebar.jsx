import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { FaHome, FaTicketAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "./index.css"
import { Link } from "react-router-dom";
const SidebarComponent = () => {
  const [collapsed,setCollapsed]=useState(true)
  return (
    <>
      <Sidebar defaultCollapsed={true} collapsed={collapsed} toggled={true} backgroundColor="#ffffff" collapsedWidth="50px" className="sidebar">
      <button className="btn-sidebar" onClick={() => setCollapsed(!collapsed)} >
        {collapsed ? <FiAlignJustify className="icon-sidebar"/> : <RxCross2 className="icon-sidebar"/>}
      </button>
        <Menu>
          <MenuItem className="menu-item" component={<Link to="/dashboard" />} icon={<FaHome className="icon"/>}>Dashboard</MenuItem>
          <MenuItem className="menu-item" icon={< FaTicketAlt  className="icon"/>}>Tickets</MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SidebarComponent;
