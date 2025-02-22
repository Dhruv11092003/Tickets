import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import "./index.css"
import { Link } from "react-router-dom";
const SidebarComponent = (props) => {
  const {items}=props
  const [collapsed,setCollapsed]=useState(true)
  return (
    <>
      <Sidebar defaultCollapsed={true} collapsed={collapsed} toggled={true} backgroundColor="#ffffff" collapsedWidth="50px" className="sidebar">
      <button className="btn-sidebar" onClick={() => setCollapsed(!collapsed)} >
        {collapsed ? <FiAlignJustify className="icon-sidebar"/> : <RxCross2 className="icon-sidebar"/>}
      </button>
        <Menu>
          {
            items.map((item, index) =>(
              <MenuItem className="menu-item" component={<Link to={item.route} />} icon={item.icon}>{item.name}</MenuItem>
            ))
          }
        </Menu>
      </Sidebar>
    </>
  );
};

export default SidebarComponent;
